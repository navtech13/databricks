// eslint-disable-next-line import/prefer-default-export
export const onetrustBody = `
function OptanonWrapper() {
    db_debug("OptanonWrapper():DB:v1.3")

    let otInitialGroupsStr = null;
    let otActiveGroupsStr = null;
    // Get initial OnetrustActiveGroups ids
    if(typeof OptanonWrapperCount == "undefined"){
      db_debug("otInitialGroups()", OnetrustActiveGroups);
      OptanonWrapperCount = '';
      otInitialGroupsStr = OnetrustActiveGroups
    }
    otActiveGroupsStr =  OnetrustActiveGroups;
    const rudderstackKey = (typeof window !== 'undefined' && window.rudderstackKey) || "${process.env.GATSBY_RUDDERSTACK_API_KEY}"
    // Load rudderstack
    rudderanalytics.load(rudderstackKey,"https://ue.databricks.com", {
        cookieConsentManager: {
            oneTrust: {
                enabled: true
            }
        }
    });

    //Delete cookies
    otRemoveOptOutCookies(otActiveGroupsStr);

    function otRemoveOptOutCookies(otActiveGroupsStr)
    {
        db_debug("otRemoveOptOutCookies()");

        var otDomainGroups = JSON.parse(JSON.stringify(Optanon.GetDomainData().Groups));
        var dbDomainGroups = ["C0001","C0002","C0003","C0004"];
        var erasedCookie = false;

        dbDomainGroups.forEach((domainGroup) => {
            // check if group is inactive
            if (!otActiveGroupsStr.includes(domainGroup)) {
                // if inactive, time to delete cookies for that group
                for(var i=0; i < otDomainGroups.length; i++){
                    // small array so brute force search
                    if(otDomainGroups[i]['CustomGroupId'] == domainGroup){
                        for(var j=0; j < otDomainGroups[i]['Cookies'].length; j++){
                            var regexp = new RegExp("^(.*;)?\\\\s*" + otDomainGroups[i]['Cookies'][j]['Name'] + "\\\\s*=\\\\s*[^;]+(.*)?$")
                            if (document.cookie.match(regexp)) {
                                db_debug("Found cookie to erase: " + otDomainGroups[i]['Cookies'][j]['Name'])
                                erasedCookie = true;
                                eraseCookie(otDomainGroups[i]['Cookies'][j]['Name']);
                            }
                        }
                    }
                }
            }
        });
    }

      //Delete cookie
      function eraseCookie(name) {
          db_debug("eraseCookie(" + name + ")")

          // Delete DB domain cookies just to be sure
          document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Domain=.databricks.com";
          document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Domain=.databricksweb.com";

          //Delete root path cookies
          domainName = window.location.hostname;
          document.cookie = name+'=; Max-Age=-99999999; Path=/;Domain='+ domainName;
          document.cookie = name+'=; Max-Age=-99999999; Path=/;';

          //Delete LSO incase LSO being used, cna be commented out.
          localStorage.removeItem(name);

          //Check for the current path of the page
          pathArray = window.location.pathname.split('/');
          //Loop through path hierarchy and delete potential cookies at each path.
          for (var i=0; i < pathArray.length; i++){
              if (pathArray[i]){
                  //Build the path string from the Path Array e.g /site/login
                  var currentPath = pathArray.slice(0,i+1).join('/');
                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + ';Domain='+ domainName;
                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + ';';
                  //Maybe path has a trailing slash!
                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + '/;Domain='+ domainName;
                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + '/;';
              }
          }

          var regexp = new RegExp("^(.*;)?\\\\s*" + name + "\\\\s*=\\\\s*[^;]+(.*)?$")
          if (document.cookie.match(regexp)) {
              db_debug("Error: Cookie not deleted (" + name + ")")
          }
          else {
              // not needed extra debug info
              // db_debug("Cookie successfully deleted (" + name + ")")
          }
      }
  }
`
