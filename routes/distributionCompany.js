router.post("/transmissioncompanylist/new", function(req, res, next){
    var q = `insert into powercompany values(${req.body.tid},"${req.body.dname}",${req.body.tenure},"${req.body.state}",${req.body.did});`;
    console.log(q);
    connection.query(q, function(error, results, fields){
        if(error) throw error;
        res.json(results);
    });
});