import express from "express";
import postgraphile from "postgraphile";
import AppDataSource from "./data-source";
import { Category } from "./entity/Category";
import { Product } from "./entity/Product";
import { Subcategory } from "./entity/Subcategory";
import { Supplier } from "./entity/Supplier";
import { Uom } from "./entity/Uom";
import { Warehouse } from "./entity/Warehouse";
import RegisterTransactionPlugin from "./plugins/RegisterTransaction";
import cors from "cors";

const App = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    postgraphile(process.env.DB_URL, "public", {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      appendPlugins: [RegisterTransactionPlugin],
    })
  );

  app.get("/api/v1/hello", async (req, res, next) => {
    res.send("success");
  });

  app.post("/api/v1/test/data", async (req, res, next) => {
    // UOM
    const each = new Uom();
    each.name = "Each";
    each.abbrev = "EA";
    await AppDataSource.manager.save(each);

    // Category
    const clothing = new Category();
    clothing.description = "Clothing";
    await AppDataSource.manager.save(clothing);

    // Subcategories
    const tShirts = new Subcategory();
    tShirts.category = clothing;
    tShirts.description = "T-Shirts";
    const coat = new Subcategory();
    coat.category = clothing;
    coat.description = "Coat";
    await AppDataSource.manager.save([tShirts, coat]);

    // Supplier
    const damageInc = new Supplier();
    damageInc.name = "Damage Inc.";
    damageInc.address = "221B Baker St";
    await AppDataSource.manager.save(damageInc);

    // Warehouse
    const dc = new Warehouse();
    dc.name = "DC";
    await AppDataSource.manager.save(dc);

    // Product
    const p1 = new Product();
    p1.category = clothing;
    p1.description = "Daily Black T-Shirt";
    p1.sku = "ABC123";
    p1.subcategory = tShirts;
    p1.uom = each;

    const p2 = new Product();
    p2.category = clothing;
    p2.description = "Beautiful Coat";
    p2.sku = "ZYX987";
    p2.subcategory = coat;
    p2.uom = each;

    const p3 = new Product();
    p3.category = clothing;
    p3.description = "White Glove";
    p3.sku = "WG1234";
    p3.uom = each;

    await AppDataSource.manager.save([p1, p2, p3]);

    res.send("data seeding completed!");
  });

  return app;
};

export default App;
