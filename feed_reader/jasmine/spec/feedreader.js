/* feedreader.js
 * Placing all tests within the $() function,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
       
        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // ensure each feed as URL defined and it is not empty.
        it('should have URLs defined', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        // ensure each feed a name defined and it is not empty.
        it('have names defined', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    describe('The menu', function() {

        let menuHidden = $('body').hasClass('menu-hidden');

        it('is hidden by default', function() {
            expect(menuHidden).toBeTruthy();
        });


        it('should show when clicked', function() {
            $('.menu-icon-link').trigger('click');
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBeFalsy();
        });


        it('should hide when clicked again', function() {
            $('.menu-icon-link').trigger('click');
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBeTruthy();
        });
    });


    describe('Initial Entries', function() {

        // ensure at least a single .entry element within the .feed container.
        beforeEach(function(done) {
            loadFeed(0, () => { done(); });
        });

        it('should have at least one .entry element in the .feed container', function(done) {
            let container = $('.feed');
            expect(container.length).toBe(1);
            done();
        });
    });


    describe('New Feed Selection', function() {

        // ensure content changes when new feed is loaded
        let originalFeed;
        let newFeed;

        beforeEach(function(done) {
            originalFeed = $('.feed').html(); // grab feed 0 content
            loadFeed(1, () => { done(); });  // load feed 1
        });

        it('should have different feed content', function(done) {
            newFeed = $('.feed').html(); // grab feed 1 content
            expect(newFeed).not.toEqual(originalFeed);
            done();
        });

        afterAll(function() {
            loadFeed(0); // reset to original feed
        });
    });
}());
