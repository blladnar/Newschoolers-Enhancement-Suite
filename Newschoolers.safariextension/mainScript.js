function stuffChanged(event)
{
    if (event.key === "infiniscroll") 
    {
    	console.log(safari);
		safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("infiniscroll", safari.extension.settings.infiniscroll);
    }
}
 
safari.extension.settings.addEventListener("change", stuffChanged, false); 