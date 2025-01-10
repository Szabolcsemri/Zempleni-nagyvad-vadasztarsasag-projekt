export default{
    IndexGetController(req, res){
        const nev = req.session.nev || "Vendég";
        res.render("index.ejs", {nev});
    }
};