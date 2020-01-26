$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  $("#menu-toggle i").toggleClass("fa-chevron-left fa-chevron-right")
});


// STORE TABS SELECTED
$('a[data-toggle="tab"]').on('click', function (e) {

    var theTabId = $(this).attr('href');
    var activeTabs = (window.localStorage.getItem('activeTab') ? window.localStorage.getItem('activeTab').split(',') : []);

    var $sameLevelTabs = $(e.target).parents('.nav-tabs').find('[data-toggle="tab"]');

    $.each($sameLevelTabs, function (index, element) {
        var tabId = $(element).attr('href');
        if(theTabId != tabId && activeTabs.indexOf(tabId) !== -1){
            activeTabs.splice(activeTabs.indexOf(tabId), 1);
        }
    });

    //unique tabs
    if (activeTabs.indexOf($(e.target).attr('href')) === -1) {
        activeTabs.push($(e.target).attr('href'));
    }

    window.localStorage.setItem('activeTab', activeTabs.join(','));

});

var activeTabs = window.localStorage.getItem('activeTab');
if (activeTabs) {
    var activeTabs = (window.localStorage.getItem('activeTab') ? window.localStorage.getItem('activeTab').split(',') : []);
    $.each(activeTabs, function (index, element) {
        $('[data-toggle="tab"][href="' + element + '"]').tab('show');
    });
}