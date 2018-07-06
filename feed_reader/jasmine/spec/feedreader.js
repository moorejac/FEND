/* feedreader.js
 * Placing all tests within the $() function,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* ensure allFeeds variable has been defined
         * and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loop through each feed in the allFeeds object and ensure
         * it has a URL defined and that the URL is not empty.
         */
        it('have URLs defined', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* loop through each feed in the allFeeds objectand ensure
         * it has a name defined and that the name is not empty.
         */
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


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, () => { done(); });
        });

        it('should have at least one .entry element in the .feed container', function(done) {
            let container = $('.feed');
            expect(container.length).toBe(1);
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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
