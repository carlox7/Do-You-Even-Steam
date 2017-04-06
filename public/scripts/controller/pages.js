'use strict';

page('/', homeController.init);
page('/home', homeController.init);
page('/about', aboutController.init);
page('/stats', statsController.init);
page('/topgames', topGamesController.init);
page('/help', helpController.init);
page();
