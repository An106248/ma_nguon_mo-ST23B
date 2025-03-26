  const categories = [
      {
        id: 1,
        name: "Điện thoại",
        description: "Các dòng điện thoại thông minh và phụ kiện",
      },
      {
        id: 2,
        name: "Laptop",
        description: "Laptop các hãng khác nhau",
      },
      {
        id: 3,
        name: "Phụ kiện",
        description: "Tai nghe, sạc, cáp,...",
      },
    ];
    
    const products = [
      {
        id: 101,
        name: "iPhone 15 Pro",
        description: "Điện thoại Apple mới nhất với chip A17",
        price: 30000000,
        stock: 50,
        category_id: 1,
      },
      {
        id: 102,
        name: "MacBook Pro 16-inch",
        description: "Laptop cao cấp của Apple với chip M2 Pro",
        price: 60000000,
        stock: 20,
        category_id: 2,
      },
      {
        id: 103,
        name: "AirPods Pro 2",
        description: "Tai nghe không dây chống ồn",
        price: 5990000,
        stock: 100,
        category_id: 3,
      },
    ];
    
    class ProductController {
      static index(req, res) {
        const categoryId = req.query.category;
        let filteredProducts = products;
        
        if (categoryId) {
          filteredProducts = products.filter(p => p.category_id === parseInt(categoryId));
        }
    
        // Thêm tên danh mục vào mỗi sản phẩm
        const productsWithCategory = filteredProducts.map(product => {
          const category = categories.find(c => c.id === product.category_id);
          return {
            ...product,
            category_name: category ? category.name : 'Không có danh mục'
          };
        });
    
        res.render("product", {
          categories: categories,
          products: productsWithCategory,
          selectedCategory: categoryId
        });
      }
    }
    
    module.exports = ProductController;