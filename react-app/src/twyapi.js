
'use strict';

var TWFYAPI =
{
	api_key: "AsqfuyBMKiVdAaKkUAEw7pBx",

	// Default constructor
	TWFYAPI: function(api_key)
	{
		// Check and set API key
		if (api_key == undefined || api_key == "") {
			throw "ERROR: No API key provided.";
		}

		if (!api_key.match(/^[A-Za-z0-9]+$/)) {
			throw "ERROR: Invalid API key provided.";
		}

		TWFYAPI.api_key = api_key;

		return TWFYAPI;
	},

	// Send an API query
	query: function(func, args)
	{
		// Exit if any arguments are not defined
		if (func == undefined || func == "" || args == undefined || args == "" || args.constructor != Object) {
			throw "ERROR: Function name or arguments not provided.";
		}

		// Construct the query
		var query = new TWFYAPI_Request.TWFYAPI_Request(func, args, TWFYAPI.api_key);

		// Execute the query
		if (query.constructor == Object) {
			TWFYAPI._execute_query(query);
		} else {
			throw "ERROR: Could not assemble request using TWFYAPI_Request.";
		}
	},

	// Execute an API query
	_execute_query: function(query)
	{
		// Make the final URL
		var url = query.encode_arguments();

		// Load the data into the page
		var script = document.createElement("script");
		script.setAttribute("src", url);
		document.getElementsByTagName("head")[0].appendChild(script);
	}

};

var TWFYAPI_Request =
{
	url: "https://www.theyworkforyou.com/api/",
	func: "",
	args: "",
	api_key: "",

	// Default constructor
	TWFYAPI_Request: function(func, args, api_key)
	{
		// Set function, arguments and API key
		TWFYAPI_Request.func = func;
		TWFYAPI_Request.args = args;
		TWFYAPI_Request.api_key = api_key;

		// Get and set the URL
		TWFYAPI_Request.url = TWFYAPI_Request._get_uri_for_function(TWFYAPI_Request.func);

		// Check to see if valid URL has been set
		if (TWFYAPI_Request.url == undefined || TWFYAPI_Request.url == "") {
			throw "ERROR: Invalid function: " + TWFYAPI_Request.func + ". Please look at the documentation for supported functions.";
		}

		return TWFYAPI_Request;
	},

	// Encode function arguments into a URL query string
	encode_arguments: function()
	{
		// Validate the output argument if it exists
		if (TWFYAPI_Request.args["output"] != undefined) {
			if (!TWFYAPI_Request._validate_output_argument(TWFYAPI_Request.args["output"])) {
				throw "ERROR: Invalid output type: " + TWFYAPI_Request.args["output"] + ". Please look at the documentation for supported output types.";
			}
		}

		// Validate the callback argument
		if (TWFYAPI_Request.args["callback"] == undefined) {
			throw "ERROR: No callback argument provided.";
		}

		// Make sure all mandatory arguments for a particular function are present
		if (!TWFYAPI_Request._validate_arguments(TWFYAPI_Request.func, TWFYAPI_Request.args)) {
			throw "ERROR: All mandatory arguments for " + TWFYAPI_Request.func + " not provided.";
		}

		// Assemble the URL
		var full_url = TWFYAPI_Request.url + "?key=" + TWFYAPI_Request.api_key + "&";
		var arg = Object.keys(TWFYAPI_Request.args);

		for (var i = 0; i < arg.length; i++) {
			full_url += arg[i] + "=" + encodeURIComponent(TWFYAPI_Request.args[arg[i]]) + "&";
		}

		full_url = full_url.substring(0, full_url.length - 1);

		return full_url;
	},

	// Get the URL for a particular function
	_get_uri_for_function: function(func)
	{
		// Exit if any arguments are not defined
		if (func == undefined || func == "") {
			return "";
		}

		// Define valid functions
		var valid_functions = {
			"convertURL"        : "Converts a parliament.uk URL into a TheyWorkForYou one, if possible",
			"getConstituency"   : "Searches for a constituency",
			"getConstituencies" : "Returns list of constituencies",
			"getPerson"         : "Returns main details for a person",
			"getMP"             : "Returns main details for an MP",
			"getMPInfo"         : "Returns extra information for a person",
			"getMPsInfo"        : "Returns extra information for one or more people",
			"getMPs"            : "Returns list of MPs",
			"getLord"           : "Returns details for a Lord",
			"getLords"          : "Returns list of Lords",
			"getMLA"	    : "Returns details for an MLA",
			"getMLAs"           : "Returns list of MLAs",
			"getMSP"            : "Returns details for an MSP",
			"getMSPs"           : "Returns list of MSPs",
			"getGeometry"       : "Returns centre, bounding box of constituencies",
			"getBoundary"	    : "Returns boundary polygon of UK Parliament constituency",
			"getCommittee"      : "Returns members of Select Committee",
			"getDebates"        : "Returns Debates (either Commons, Westminster Hall, or Lords)",
			"getWrans"          : "Returns Written Answers",
			"getWMS"            : "Returns Written Ministerial Statements",
			"getHansard"        : "Returns any of the above",
			"getComments"       : "Returns comments"
		};

		// If the function exists, return its URL
		if (valid_functions[func] != undefined) {
			return TWFYAPI_Request.url + func;
		} else {
			return "";
		}
	},

	// Validate the "output" argument
	_validate_output_argument: function(output)
	{
		if (output == undefined || output == "") {
			return false;
		}

		// Define valid output types
		// Note: XML, PHP and RABX are not available since they are not compatible with cross-domain JSONP
		var valid_params = {
			"js"   : "a JavaScript object"
		};

		// Check to see if the output type provided is valid
		if (valid_params[output] != undefined) {
			return true;
		} else {
			return false;
		}
	},

	// Validate arguments
	_validate_arguments: function(func, args)
	{
		// Define mandatory arguments
		var functions_params = {
			"convertURL"        : ["url"],
			"getConstituency"   : ["postcode"],
			"getConstituencies" : [],
			"getPerson"         : ["id"],
			"getMP"             : [],
			"getMPInfo"         : ["id"],
			"getMPs"            : [],
			"getLord"           : ["id"],
			"getLords"          : [],
			"getMLA"	    : [],
			"getMLAs"           : [],
			"getMSPs"           : [],
			"getGeometry"       : [],
			"getBoundary"	    : ["name"],
			"getCommittee"      : ["name"],
			"getDebates"        : ["type"],
			"getWrans"          : [],
			"getWMS"            : [],
			"getHansard"        : [],
			"getComments"       : []
		};

		// Check to see if all mandatory arguments are present
		var required_params = functions_params[func];
		var param = '';

		for (param in required_params) {
			if (!args.hasOwnProperty(param)) {
				return false;
			}
		}

		return true;
	}
};

// Create our own implementation of Object.keys if the browser doesn't already support it
Object.keys = Object.keys || function(o)
{
	var result = [];
	for (var name in o) {
		if (o.hasOwnProperty(name)) {
			result.push(name);
		}
	}
	return result;
};
