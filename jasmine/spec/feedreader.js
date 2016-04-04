/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //test suite for allfeeds
    describe('RSS Feeds', function() {
        //confrims allfeeds is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


          //confirms that allfeeds entries have url's
         it('url is defined', function() {
            for (i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].url).toBeDefined();
              expect(allFeeds[i].url.length).not.toBe(0);
            }
         });


         //confirmms that allfeeds entries have names
         it('name is defined', function() {
            for (i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].name).toBeDefined();
              expect(allFeeds[i].name.length).not.toBe(0);
            }
         });

    });


    //menu test
    describe('The menu', function () {
        var $menuIcon = $('.menu-icon-link');

        //test checks to make sure menu is hidden by default
         it('is hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });

          //test checks to see if visibility is changed when menu is clicked
          it('changes visibility when clicked', function() {
            //saves original state of menu visibilty
            $hiddenState = $('body').hasClass('menu-hidden');
            //clicks menu to change state
            $menuIcon.trigger('click');
            //checks new state against original state
            $hiddenStateOneClick = $('body').hasClass('menu-hidden');
            expect($hiddenState).not.toMatch($hiddenStateOneClick);

            //clicks menu again to change state
            $menuIcon.trigger('click');
            //checks new state against previous state
            $hiddenStateTwoClick = $('body').hasClass('menu-hidden');
            expect($hiddenStateTwoClick).not.toMatch($hiddenStateOneClick);
          });

    });

    /* new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

         //adds async feed load
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         //checks feed to see if entry element is created in feed container
         it('loadfeed creates at least one entry element in feed container', function(done) {
           var entriesLen = $('.feed .entry').length;
           console.log('entriesLen ' + entriesLen);
           expect(entriesLen).toBeGreaterThan(0);
           done();
         });

         //restores orignal state
         afterAll(function(done) {
             loadFeed(0, done);
         });
    });

    describe('New Feed Selection', function(done) {

         //adds async feed load to check content change
         beforeEach(function(done) {
           loadFeed(0, function() {
             title = $('.feed .entry h2').html();
             header = $('h1.header-title').html();
             loadFeed(1, function() {
               done();
             });
           });
         });

         //checks to see if content changed
         it('new feed loaded has content that changes', function(done) {
           expect($('.feed .entry h2').html()).not.toBe(title);
           expect($('h1.header-title').html()).not.toBe(header);
           done();
         });

        //restores orignal state
        afterAll(function(done) {
            loadFeed(0, done);
        });
    });
}());
