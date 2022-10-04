using DotVVM.Framework.Configuration;
using DotVVM.Framework.ResourceManagement;
using DotVVM.Framework.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace DotvvmJsTemplate;

public class DotvvmStartup : IDotvvmStartup, IDotvvmServiceConfigurator
{
    // For more information about this class, visit https://dotvvm.com/docs/tutorials/basics-project-structure
    public void Configure(DotvvmConfiguration config, string applicationPath)
    {
        ConfigureRoutes(config, applicationPath);
        ConfigureControls(config, applicationPath);
        ConfigureResources(config, applicationPath);
    }

    private void ConfigureRoutes(DotvvmConfiguration config, string applicationPath) {
        config.RouteTable.Add("Default", "", "Views/Home.dothtml");
        config.RouteTable.AutoDiscoverRoutes(new DefaultRouteStrategy(config));    
    }

    private void ConfigureControls(DotvvmConfiguration config, string applicationPath) {
    }

    private void ConfigureResources(DotvvmConfiguration config, string applicationPath) {
        config.Resources.RegisterScriptModuleFile("fluent-controls-module", "~/wwwroot/fluent-controls.js");
    }

    public void ConfigureServices(IDotvvmServiceCollection options) {
        options.AddDefaultTempStorages("temp");
        options.AddHotReload();
    }
}