const cds = require("@sap/cds");
class TestpgService extends cds.ApplicationService {
  async init() {
    this.before("*", "*", async (req) => {
      return req;
    });

    this.on("postMessage", async (req) => {
      const db = await cds.connect.to("db");
      const { Messages } = db.entities;
      const obj = {
        token: req.data.msg,
        updsrc: 'EVENT'
      };
      let res = await INSERT(obj).into(Messages);      
      const entries = [...res];
      console.log(entries);
      await cds.tx(async () =>{
        obj.updsrc = "CDSTX";
        const txres = await INSERT(obj).into(Messages);
        const txentries = [...txres];
        console.log(txentries);
      });
      return entries[0].ID;
    });
    return super.init();
  }
}
module.exports = { TestpgService };
