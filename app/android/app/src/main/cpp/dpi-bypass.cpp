#include "dpi-bypass.h"
#include "dns.h"
#include "hostlist.h"
#include "packet.h"
#include "socket.h"

Settings settings;
JNIEnv* jni_env;

std::string CONNECTION_ESTABLISHED_RESPONSE("HTTP/1.1 200 Connection established\r\n\r\n");
std::vector<pid_t> child_processes;
int server_socket;

void proxy_https(int client_socket, std::string host, int port)
{
	int remote_server_socket;

	if(init_remote_server_socket(remote_server_socket, host, port, true) == -1)
	{
		return;
	}

	// Search in host list one time to save cpu time
	bool hostlist_condition = settings.other.is_use_hostlist ? find_in_hostlist(host) : true;

	// Split only first https packet, what contains unencrypted sni
	bool is_clienthello_request = true;

	while(true)
	{
		std::string request(8192, ' ');
		std::string response(8192, ' ');

		if(recv_string(client_socket, request) == -1) // Receive request from client
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}

		// Check if split is need
		if(hostlist_condition && settings.https.is_use_split && is_clienthello_request)
		{
			if(send_string(remote_server_socket, request, settings.https.split_position) == -1) // Send request to server
			{
				close(remote_server_socket);
				close(client_socket);
				return;
			}

			// VPN mode specific
			// VPN mode requires splitting for all packets
			is_clienthello_request = settings.other.is_use_vpn;
		}
		else
		{
			if(send_string(remote_server_socket, request) == -1) // Send request to server
			{
				close(remote_server_socket);
				close(client_socket);
				return;
			}
		}

		if(recv_string(remote_server_socket, response) == -1) // Receive response from server
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}

		if(send_string(client_socket, response) == -1) // Send response to client
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}
	}
}

void proxy_http(int client_socket, std::string host, int port, std::string first_request)
{
	int remote_server_socket;

	if(init_remote_server_socket(remote_server_socket, host, port, false) == -1)
	{
		return;
	}

	// Process first request
	std::string first_response(8192, ' ');

	// Search in host list one time to save cpu time
	bool hostlist_condition = settings.other.is_use_hostlist ? find_in_hostlist(host) : true;

	// Modify http request to bypass dpi
	modify_http_request(first_request, hostlist_condition);

	// Check if split is need
	if(hostlist_condition && settings.http.is_use_split)
	{
		if(send_string(remote_server_socket, first_request, settings.http.split_position) == -1) // Send request to serv$
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}
	}
	else
	{
		if(send_string(remote_server_socket, first_request) == -1) // Send request to server
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}
	}

	if(recv_string(remote_server_socket, first_response) == -1) // Receive response from server
	{
		close(remote_server_socket);
		close(client_socket);
		return;
	}

	if(send_string(client_socket, first_response) == -1) // Send response to client
	{
		close(remote_server_socket);
		close(client_socket);
		return;
	}

	while(true)
	{
		std::string request(8192, ' ');
		std::string response(8192, ' ');

		if(recv_string(client_socket, request) == -1) // Receive request from client
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}

		// Modify http request to bypass dpi
		modify_http_request(request, hostlist_condition);

		// Check if split is need
		if(hostlist_condition && settings.http.is_use_split)
		{
			if(send_string(remote_server_socket, request, settings.http.split_position) == -1) // Send request to serv$
			{
				close(remote_server_socket);
				close(client_socket);
				return;
			}
		}
		else
		{
			if(send_string(remote_server_socket, request) == -1) // Send request to server
			{
				close(remote_server_socket);
				close(client_socket);
				return;
			}
		}

		if(recv_string(remote_server_socket, response) == -1) // Receive response from server
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}

		if(send_string(client_socket, response) == -1) // Send response to client
		{
			close(remote_server_socket);
			close(client_socket);
			return;
		}
	}
}

void process_client(int client_socket)
{
    std::string log_tag = "CPP/process_client";

	std::string request(2048, ' ');

	// Receive with timeout
    struct timeval timeout;
    timeout.tv_sec = 2;
    timeout.tv_usec = 0;

	if(recv_string(client_socket, request, timeout) == -1)
	{
		close(client_socket);
		return;
	}

	std::string method;
	std::string host;
	int port;
	if(parse_request(request, method, host, port) == -1)
	{
		log_error(log_tag.c_str(), "Can't parse first http request, so can't process client");
		close(client_socket);
		return;
	}

	if(method == "CONNECT")
	{
		if(send_string(client_socket, CONNECTION_ESTABLISHED_RESPONSE) == -1)
		{
			close(client_socket);
			return;
		}

		proxy_https(client_socket, host, port);
	}
	else
	{
		proxy_http(client_socket, host, port, request);
	}

	close(client_socket);
}

extern "C" JNIEXPORT jint JNICALL Java_ru_evgeniy_dpitunnel_NativeService_init(JNIEnv* env, jobject obj, jobject prefs_object)
{
    std::string log_tag = "CPP/init";

    // Store JavaVM globally
    jni_env = env;

    // Clear child processes vector
    child_processes.clear();

    // Find SharedPreferences
    jclass prefs_class = env->FindClass("android/content/SharedPreferences");
    if(prefs_class == NULL)
    {
        log_error(log_tag.c_str(), "Failed to find SharedPreferences class");
        return -1;
    }

    // Find method
    jmethodID prefs_getBool = env->GetMethodID(prefs_class, "getBoolean", "(Ljava/lang/String;Z)Z");
    if(prefs_getBool == NULL)
    {
        log_error(log_tag.c_str(), "Failed to find getInt method");
        return -1;
    }

    // Find method
    jmethodID prefs_getString = env->GetMethodID(prefs_class, "getString", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
    if(prefs_getString == NULL)
    {
        log_error(log_tag.c_str(), "Failed to find getInt method");
        return -1;
    }

    // Fill settings
    jstring string_object;
    settings.https.is_use_split = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("https_split"), false);
    string_object = (jstring) env->CallObjectMethod(prefs_object, prefs_getString, env->NewStringUTF("https_split_position"), NULL);
    settings.https.split_position = (unsigned int) atoi(env->GetStringUTFChars(string_object, 0));
    settings.https.is_use_socks5 = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("https_socks5"), false);
    settings.https.is_use_http_proxy = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("https_http_proxy"), false);

    settings.http.is_use_split = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_split"), false);
    string_object = (jstring) env->CallObjectMethod(prefs_object, prefs_getString, env->NewStringUTF("http_split_position"), NULL);
    settings.http.split_position = (unsigned int) atoi(env->GetStringUTFChars(string_object, 0));
    settings.http.is_change_host_header = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_header_switch"), false);
    string_object = (jstring) env->CallObjectMethod(prefs_object, prefs_getString, env->NewStringUTF("http_header_spell"), NULL);
    settings.http.host_header = env->GetStringUTFChars(string_object, 0);
    settings.http.is_add_dot_after_host = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_dot"), false);
    settings.http.is_add_tab_after_host = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_tab"), false);
    settings.http.is_remove_space_after_host = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_space_host"), false);
    settings.http.is_add_space_after_method = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_space_method"), false);
    settings.http.is_add_newline_before_method = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_newline_method"), false);
    settings.http.is_use_unix_newline = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_unix_newline"), false);
    settings.http.is_use_socks5 = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_socks5"), false);
    settings.http.is_use_http_proxy = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("http_http_proxy"), false);

    settings.dns.is_use_doh = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("dns_doh"), false);
    settings.dns.is_use_doh_only_for_site_in_hostlist = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("dns_doh_hostlist"), false);
    string_object = (jstring) env->CallObjectMethod(prefs_object, prefs_getString, env->NewStringUTF("dns_doh_server"), NULL);
    settings.dns.dns_doh_servers = env->GetStringUTFChars(string_object, 0);

    settings.other.is_use_hostlist = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("other_hostlist"), false);
    string_object = (jstring) env->CallObjectMethod(prefs_object, prefs_getString, env->NewStringUTF("other_socks5"), NULL);
    settings.other.socks5_server = env->GetStringUTFChars(string_object, 0);
    string_object = (jstring) env->CallObjectMethod(prefs_object, prefs_getString, env->NewStringUTF("other_http_proxy"), NULL);
    settings.other.http_proxy_server = env->GetStringUTFChars(string_object, 0);
    string_object = (jstring) env->CallObjectMethod(prefs_object, prefs_getString, env->NewStringUTF("other_bind_port"), NULL);
    settings.other.bind_port = atoi(env->GetStringUTFChars(string_object, 0));

    settings.other.is_use_vpn = env->CallBooleanMethod(prefs_object, prefs_getBool, env->NewStringUTF("other_vpn_setting"), false);

	// Parse hostlist if need
	if(settings.other.is_use_hostlist)
	{
		if(parse_hostlist() == -1)
		{
			return -1;
		}
	}

	// Create socket
	if((server_socket = socket(AF_INET, SOCK_STREAM, 0)) < 0)
	{
		log_error(log_tag.c_str(), "Can't create server socket");
		return -1;
	}

	// Set options for socket
	int opt = 1;
	if(setsockopt(server_socket, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(int)))
	{
        log_error(log_tag.c_str(), "Can't setsockopt on server socket. Errno: %s", strerror(errno));
		return -1;
	}
	// Server address options
	struct sockaddr_in server_address;
	server_address.sin_family = AF_INET;
	server_address.sin_addr.s_addr = INADDR_ANY;
	server_address.sin_port = htons(settings.other.bind_port);

	// Bind socket
	if(bind(server_socket, (struct sockaddr *) &server_address, sizeof(server_address)) < 0)
	{
		log_error(log_tag.c_str(), "Can't bind server socket. Errno: %s", strerror(errno));
		return -1;
	}

	// Listen to socket
	if(listen(server_socket, 10) < 0)
	{
		log_error(log_tag.c_str(), "Can't listen to server socket");
		return -1;
	}

	return 0;
}

extern "C" JNIEXPORT void Java_ru_evgeniy_dpitunnel_NativeService_acceptClient(JNIEnv* env, jobject obj)
{
    std::string log_tag = "CPP/acceptClient";

    //Accept client
    int client_socket;
    struct sockaddr_in client_address;
    socklen_t client_address_size = sizeof(client_address);
    if((client_socket = accept(server_socket, (sockaddr *) &client_address, &client_address_size)) < 0)
    {
        log_error(log_tag.c_str(), "Can't accept client socket. Error: %s", std::strerror(errno));
        return;
    }

    // Process client
    pid_t child_process = fork();
    child_processes.push_back(child_process);
    if(child_process == 0)
    {
        process_client(client_socket);
        exit(0);
    }
}

extern "C" JNIEXPORT void Java_ru_evgeniy_dpitunnel_NativeService_deInit(JNIEnv* env, jobject obj)
{
    std::string log_tag = "CPP/deInit";

    // Kill child processes
	for (pid_t child_process : child_processes)
	{
		kill(child_process, SIGKILL);
	}

    // Shutdown server socket
    if(shutdown(server_socket, SHUT_RDWR) == -1)
    {
        log_error(log_tag.c_str(), "Can't shutdown server socket. Errno: %s", strerror(errno));
    }
    if(close(server_socket) == -1)
    {
        log_error(log_tag.c_str(), "Can't close server socket. Errno: %s", strerror(errno));
    }
}