var createServiceConfiguration;

createServiceConfiguration = function(service, clientId, secret) {
    var config;
    ServiceConfiguration.configurations.remove({
        service: service
    });
    config = {
        generic: {
            service: service,
            clientId: clientId,
            secret: secret
        },
        facebook: {
            service: service,
            appId: clientId,
            secret: secret
        },
        twitter: {
            service: service,
            appId: clientId,
            secret: secret
        }
    };
    switch (service) {
        case 'facebook':
            return ServiceConfiguration.configurations.insert(config.facebook);
        case 'twitter':
            return ServiceConfiguration.configurations.insert(config.twitter);
    }
};


createServiceConfiguration('facebook', '1525073457790455', 'a0add54698cf86f4ab91168a09d74ebd');
createServiceConfiguration('twitter', 'qH5aha19cGukMGUSf79P62XxM', 'EMyCSK9msvwSWBZjxiFN47tbcG8eUe2v0b9Z55ZBblPYvlwTeK');


