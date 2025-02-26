/*global define, brackets, $ */

// a phoenix code extension to show/hide the toolbar using the statusbar or using the menu item in   the view menu
define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    const AppInit = brackets.getModule("utils/AppInit"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Commands = brackets.getModule("command/Commands"),
        Menus = brackets.getModule("command/Menus"),
        StatusBar = brackets.getModule("widgets/StatusBar");

    // command registration
    const TOGGLE_TOOLBAR_ID = "toolbarToggle.toggle";
    CommandManager.register("Hide Toolbar", TOGGLE_TOOLBAR_ID, toggleToolbar);

    // Variable to track toolbar visibility state
    let isToolbarVisible = true;
    let statusItem; // reference to the status bar item

    // Function to toggle the toolbar visibility
    function toggleToolbar() {
        if (isToolbarVisible) {
            // Hide the toolbar
            $("#main-toolbar").css("display", "none");
            $(".main-view .content").css("right", "0px");
            isToolbarVisible = false;

            // Update command name to reflect the current state of the toolbar
            CommandManager.get(TOGGLE_TOOLBAR_ID).setName("Show Toolbar");
            // Update status bar item text
            statusItem.text("Show Toolbar");
        } else {
            // Show the toolbar
            $("#main-toolbar").css("display", "block");
            $(".main-view .content").css("right", "");
            isToolbarVisible = true;

            // Update command name to reflect the current state of the toolbar
            CommandManager.get(TOGGLE_TOOLBAR_ID).setName("Hide Toolbar");
            // Update status bar item text
            statusItem.text("Hide Toolbar");
        }
    }


    AppInit.appReady(function () {
        // add menu item inside the view menu
        const viewMenu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        viewMenu.addMenuItem(TOGGLE_TOOLBAR_ID, "", Menus.AFTER, Commands.VIEW_HIDE_SIDEBAR);

        // add an icon to status bar too
        statusItem = $("<div id='toolbar-toggle-status-item' class='status-item clickable'>Hide Toolbar</div>").click(
            toggleToolbar
        );
        StatusBar.addIndicator("toolbarToggle", statusItem, true);

        console.log("Toolbar Toggle extension loaded");
    });
});
