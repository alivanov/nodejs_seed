exports.configure = function (app, firebaseRootRef, helpers) {
/*
    // Get the data on a post that has changed
    firebaseRootRef.on("child_changed", function(snapshot) {
        var changedPost = snapshot.val();
        console.log("The updated post title is ",  changedPost);
    });
*/
    app.get('/api/v1/firebase', function (req, res) {

        var test = firebaseRootRef.child('test');
        var post = test.push({
            num: 1,
            text: 'yay1!'
        });

        res.simpleJsonApiResponse(null, helpers.getSuccessApiResponse(post.key()));
    });
/*
    app.get('/api/v1/firebase2', function (req, res) {

        var test = firebaseRootRef.child('test');
        test.set({});

        res.simpleJsonApiResponse(null, helpers.getSuccessApiResponse('removed'));
    });
*/
};
