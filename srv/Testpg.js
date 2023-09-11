const cds = require("@sap/cds");
class TestpgService extends cds.ApplicationService {
  async init() {
    this.before("*", "*", async (req) => {
      return req;
    });

    this.on("postMessage", async (req) => {
      const db = await cds.connect.to("db");
      const { Messages } = db.entities;
      const token = req.data.msg;
      const obj = {
        token: token,
      };
      let id = "NO UPDATE";
      if (token.startsWith("EV")) {
        obj.updsrc = "EVENT";
        const res = await INSERT(obj).into(Messages);
        const entries = [...res];
        console.log(entries);
        id = entries[0].ID;
      } else if (token.startsWith("TX")) {
        await cds.tx(async () => {
          obj.updsrc = "CDSTX";
          const txres = await INSERT(obj).into(Messages);
          const txentries = [...txres];
          id = txentries[0].ID;
          console.log(txentries);
        });
      }
      return id;
    });
    return super.init();
  }
}
module.exports = { TestpgService };
