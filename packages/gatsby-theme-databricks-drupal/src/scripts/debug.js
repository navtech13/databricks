// eslint-disable-next-line import/prefer-default-export
export const debugBody = `
    var is_DB_Debug = false;
    var db_debug = function(){}

    function db_marketopages_getCookie(name) {
        var cookie_match = document.cookie.match('(^|;)\\\\s*' + name + '\\\\s*=\\\\s*([^;]+)');
        if(cookie_match) {
            return cookie_match.pop();
        }
        return '';
    }

    var cookie_db_debug = db_marketopages_getCookie('wp-db_debug');
    if(cookie_db_debug != '') {
        is_DB_Debug = true;
    }

    if (is_DB_Debug) {
      db_debug = console.log.bind(window.console)
    }
`
