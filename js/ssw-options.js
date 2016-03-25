/* Site Setup Wizard */

/* JS for Site Setup Wizard Options Page */

var site_user_category = options['site_address_bucket'];
var site_category_no_prefix = options['site_address_bucket_none_value'];
var banned_site_address = options['banned_site_address'];
var hide_plugin_category = options['hide_plugin_category'];
var external_plugins = options['external_plugins'];
    var wpmu_multisite_privacy_plugin = external_plugins['wpmu_multisite_privacy_plugin'] ? external_plugins['wpmu_multisite_privacy_plugin']: false;
    var wpmu_pretty_plugins = external_plugins['wpmu_pretty_plugins'] ? external_plugins['wpmu_pretty_plugins'] : false;
    var wpmu_multisite_theme_manager = external_plugins['wpmu_multisite_theme_manager'] ? external_plugins['wpmu_multisite_theme_manager'] : false;
    var wpmu_new_blog_template = external_plugins['wpmu_new_blog_template'] ? external_plugins['wpmu_new_blog_template'] : false;

var privacy_selection_txt = options['advanced_privacy']['privacy_selection_txt'];
var private_network_users_txt = options['advanced_privacy']['private_network_users_txt'];
var private_site_users_txt = options['advanced_privacy']['private_site_users_txt'];
var private_administrator_txt = options['advanced_privacy']['private_administrator_txt'];

var user_role_mapping = options['user_role_mapping'];
var site_type = options['site_type'];
var is_user_role_restriction = options['user_role_restriction'] ? options['user_role_restriction'] : false;
var ssw_not_available = options['ssw_not_available'];
var ssw_not_available_txt = options['ssw_not_available_txt'];
var terms_of_use = options['terms_of_use'];
var plugins_page_txt = options['plugins_page_txt'];
var steps_name = options['steps_name'] ? options['steps_name'] : '';
var is_privacy_selection = options['privacy_selection'] ? options['privacy_selection'] : false;
var is_debug_mode = options['debug_mode'] ? options['debug_mode'] : false;
var is_master_user = options['master_user'] ? options['master_user'] : false;

console.log(options);

// add a default --Select-- value to selectBox
function addNewSelectOption(selectBox) {
    var opt = document.createElement('option');
    opt.value = 'add_new';
    opt.innerHTML = '--Add New--';
    selectBox.appendChild(opt);
}

function loadOptionsPage() {
    // add the values to userSelect by default on page load
    var userSelect = document.getElementById("ssw-user-role");
    var siteCategoryNoPrefix = document.getElementById("ssw-site-category-no-prefix");
    var bannedSiteAddress = document.getElementById("ssw-banned-site-address");
    var termsOfUse = document.getElementById("ssw-terms-of-use");
    var pluginsPageTxt = document.getElementById("ssw-plugins-page-txt");
    var privacySelection = document.getElementById("ssw-privacy-selection");
    var step1 = document.getElementById("ssw-step-1");
    var step2 = document.getElementById("ssw-step-2");
    var step3 = document.getElementById("ssw-step-3");
    var step4 = document.getElementById("ssw-step-4");
    var stepFinish = document.getElementById("ssw-step-finish");
    var wpmuMultisitePrivacyPlugin = document.getElementById("wpmu-multisite-privacy-plugin");
    var wpmuPrettyPlugin = document.getElementById("wpmu-pretty-plugin");
    var wpmuMultisiteThemeManagerPlugin = document.getElementById("wpmu-multisite-theme-manager-plugin");
    var wpmuNewBlogTemplatePlugin = document.getElementById("wpmu-new-blog-template-plugin");
    var privacySelectionTxt = document.getElementById("privacy-selection-txt");
    var privateNetworkUsersTxt = document.getElementById("private-network-users-txt");
    var privateSiteUsersTxt = document.getElementById("private-site-users-txt");
    var privateAdministratorTxt = document.getElementById("private-administrator-txt");
    var userRoleRestriction = document.getElementById("user-role-restriction");
    var sswNotAvailable = document.getElementById("ssw-not-available");
    var sswNotAvailableTxt = document.getElementById("ssw-not-available-txt");    
    var debugModeEnable = document.getElementById("ssw-debug-mode-enable");
    var debugModeDisable = document.getElementById("ssw-debug-mode-disable");
    var debugMasterUser = document.getElementById("ssw-debug-master-user");
    for(var siteUserCategory in site_user_category) {
        // skip loop if property is from prototype
        if(!site_user_category.hasOwnProperty([siteUserCategory])) { continue; }
        var opt = document.createElement('option');
        opt.value = siteUserCategory;
        opt.innerHTML = siteUserCategory;
        userSelect.appendChild(opt);
    }
    addNewSelectOption(userSelect);
    sswUserRole();

    // load remaining options independant values
    siteCategoryNoPrefix.value = site_category_no_prefix.join(" ");
    bannedSiteAddress.value = banned_site_address.join(" ");
    termsOfUse.innerHTML = terms_of_use;
    pluginsPageTxt.innerHTML = plugins_page_txt;
    privacySelection.checked = is_privacy_selection;

    // Wizard Titles
    step1.value = steps_name['step1'];
    step2.value = steps_name['step2'];
    step3.value = steps_name['step3'];
    step4.value = steps_name['step4'];
    stepFinish.value = steps_name['finish'];
    
    // External Plugins
    wpmuMultisitePrivacyPlugin.checked = wpmu_multisite_privacy_plugin;
    wpmuPrettyPlugin.checked = wpmu_pretty_plugins;
    wpmuMultisiteThemeManagerPlugin.checked = wpmu_multisite_theme_manager;
    wpmuNewBlogTemplatePlugin.checked = wpmu_new_blog_template;

    // Advanced Privacy Options
    privacySelectionTxt.innerHTML = privacy_selection_txt;
    privateNetworkUsersTxt.value = private_network_users_txt;
    privateSiteUsersTxt.value = private_site_users_txt;
    privateAdministratorTxt.value = private_administrator_txt;

    // User Role Restriction
    userRoleRestriction.checked = is_user_role_restriction;
    sswNotAvailable.value = ssw_not_available;
    sswNotAvailableTxt.innerHTML = ssw_not_available_txt;
    
    // Debug Settings
    if(is_debug_mode) {
        debugModeEnable.checked = is_debug_mode;
    }
    else {
        debugModeDisable.checked = true;
    }
    debugMasterUser.checked = is_master_user;
}

function sswUserRole() {
    var userSelect = document.getElementById("ssw-user-role");
    var siteTypeSelect = document.getElementById("ssw-site-type");
    var siteCategorySelect = document.getElementById("ssw-site-category");
    if (userSelect.value=='add_new')
    {
        document.getElementById("add-user-role-input").style.visibility='visible';
        document.getElementById("add-user-role-btn").style.visibility='visible';

        // Set remaining select boxes to Add New
        document.getElementById("ssw-site-category").value='add_new';
        document.getElementById("ssw-site-type").value='add_new';
    } 
    else 
    {
        document.getElementById("add-user-role-input").style.visibility='hidden';
        document.getElementById("add-user-role-btn").style.visibility='hidden';

        // change value of siteTypeSelect based on userSelect value
        var siteTypeUser = site_type[userSelect.value];
        siteTypeSelect.options.length = 0;
        for(var prop in siteTypeUser) {
            if(!siteTypeUser.hasOwnProperty([prop])) { continue; }
            var opt = document.createElement('option');
            opt.value = prop;
            opt.innerHTML = siteTypeUser[prop];
            siteTypeSelect.appendChild(opt);
        }
        addNewSelectOption(siteTypeSelect);

        // change value of siteCategorySelect based on userSelect value
        var siteUserCategory = site_user_category[userSelect.value];
        siteCategorySelect.options.length = 0;
        for(var prop in siteUserCategory) {
            if(!siteUserCategory.hasOwnProperty([prop])) { continue; }
            var opt = document.createElement('option');
            opt.value = prop;
            opt.innerHTML = siteUserCategory[prop];
            siteCategorySelect.appendChild(opt);
        }
        addNewSelectOption(siteCategorySelect);
    }

    // trigger change function for siteCategorySelect and siteTypeSelect
    sswSiteType();
    sswSiteCategory();
}

function sswSiteType() {
    if (document.getElementById("ssw-site-type").value=='add_new')
    {        
        document.getElementById("add-site-type-input").style.visibility='visible';
        document.getElementById("add-site-type-btn").style.visibility='visible';

        // Set remaining select boxes to Add New
        //document.getElementById("ssw-site-category").value='add_new';
    } 
    else 
    { 
        document.getElementById("add-site-type-input").style.visibility='hidden';
        document.getElementById("add-site-type-btn").style.visibility='hidden';
    }; 
}

function sswSiteCategory() {
    if (document.getElementById("ssw-site-category").value=='add_new')
    {
        document.getElementById("add-site-category-input").style.visibility='visible';
        document.getElementById("add-site-category-btn").style.visibility='visible';
    } 
    else 
    { 
        document.getElementById("add-site-category-input").style.visibility='hidden';
        document.getElementById("add-site-category-btn").style.visibility='hidden';
    }; 
}


function sswAddNewValue(inputTxtId, selectBoxId) {
    var inputTxt = document.getElementById(inputTxtId);
    var selectBox = document.getElementById(selectBoxId);
    var userSelect = document.getElementById("ssw-user-role");

    var arr = Object.keys(options['site_address_bucket']).map(function (selectedUser) {return options['site_address_bucket'][selectedUser]});
    if(selectBox != userSelect) {
        var selectedUser = userSelect.options[userSelect.selectedIndex].value;
        if(selectBox.value == 'ssw-site-type') {
            options['site_type'][selectedUser][inputTxt.value.replace(/ /g, "_")] = inputTxt.value;
        }
        if(selectBox.value == 'ssw-site-category') {
            //options['site_address_bucket'][selectedUser][inputTxt.value] = inputTxt.value;
        }
    }

    console.log(arr);
    
    var opt = document.createElement('option');
    opt.value = inputTxt.value.replace(/ /g,"_");
    opt.innerHTML = inputTxt.value;
    selectBox.appendChild(opt);
    
    //console.log(site_type); 
    console.log(site_user_category);
}

// Load the values first time when the page loads 
window.onload = loadOptionsPage();

/* ENDS JS for Site Setup Wizard Options Page */