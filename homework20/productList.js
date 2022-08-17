const getProductList = () => {

    const products = [];
    function productListFilling (name, category, img, price) {
        let obj = {
            name,
            category,
            img,
            price
        }
        products.push(obj)
    }
    productListFilling ('Microsoft Surface Laptop 3 15 Ryzen 5 3580U', 'Laptop', 'https://www.notebookcheck-ru.com/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1_.JPG', '550$');
    productListFilling ('Samsung Galaxy A12, 4GB/64GB', 'Smartphone', 'https://celtec.pe/wp-content/uploads/2021/04/Samsung-Galaxy-A12-1.jpg', '200$');
    productListFilling ('TV LG 32LM637BPLA', 'Smart TV', 'https://i.moyo.ua/55aec978-af5b-4da3-9655-8ddd8460efaf/https://img.moyo.ua/img/products/4879/6_4000.jpg/w_1500,h_1500,r_inside,imdt', '349,99$');
    productListFilling ('Philips FC9350/01 PowerPro Compact Bagless Vacuum Cleaner', 'Vacuum cleaner', 'https://static-01.daraz.com.bd/p/d4a3370837b00b6cadcdaaac488c1378.jpg', '235$');
    productListFilling ('Lenovo Robot Vacuum Cleaner E1', 'Robot vacuum cleaner', 'https://hotline.ua/img/tx/238/2384758045.jpg', '320$');
    productListFilling ('LG FHM1065ZDL 6.5 kg Front Load Fully Automatic Washing Machine', 'Washing machine', 'https://www.lg.com/in/images/washing-machines/md07544601/FHM1065SDW-Washing-Machines-Thumb-350.jpg', '420$');
    productListFilling ('Phoenix Gaming PC - ASUS GeForce RTX 3080 | AMD Ryzen 9 5900x', 'PC', 'https://vrlatech.com/wp-content/uploads/2021/12/PhoenixMain45-Edit-Edit.jpg', '1200$');
    productListFilling ('Blender PHILIPS HR3573/90', 'Blender', 'https://files.foxtrot.com.ua/PhotoNew/img_0_114_1363_0.jpg', '115$');
    productListFilling ('Philips DryCare 2200W Hair Dryer', 'Hair dryer', 'https://www.tradeinn.com/f/13819/138199618/philips-drycare-2200w-hair-dryer.jpg', '89,99$');
    productListFilling ('Printer SAMSUNG SL-M2830DW/XEV', 'Printer', 'https://files.foxtrot.com.ua/PhotoNew/img_0_22327_416_3.jpg', '147,50$');
    productListFilling ('TP-Link TL-MR3420 3G/4G, N300, 5x RJ45 100Mb/s', 'WI-FI router', 'https://www.batna24.com/img2/1000/134667_1.webp', '43$');

    return products;
}

module.exports = {
    getProductList
}