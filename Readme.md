# Product management





## what we used :
- express
- knex
- mySql
- body Parser
- dotenv 
- cors
- joi 

## Database Model:

Product (Table)
- id (Primary Key)
- name (String)
- description (String)
- price (Float)
- status (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)

Category (Table)
- id (Primary Key)
- name (String)
- parent_id (Foreign Key - Category.id)
- status (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)

Attribute (Table)
- id (Primary Key)
- name (String)
- created_at (Timestamp)
- updated_at (Timestamp)

Product_Category (Table - Pivot Table)
- product_id (Foreign Key - Product.id)
- category_id (Foreign Key - Category.id)

Product_Attribute (Table - Pivot Table)
- product_id (Foreign Key - Product.id)
- attribute_id (Foreign Key - Attribute.id)
- value (String)


## Router Path: 

### Category :

- Create Category: POST /api/categories
- Get All Categories: GET /api/categories
- Get Category by ID: GET /api/categories/:id
- Update Category: PUT /api/categories/:id
- Delete Category: DELETE /api/categories/:id


Attribute Endpoints:

- Create Attribute: POST /api/attributes
- Get All Attributes: GET /api/attributes
- Get Attribute by ID: GET /api/attributes/:id
- Update Attribute: PUT /api/attributes/:id
- Delete Attribute: DELETE /api/attributes/:id

Product Endpoints:

- Create Product: POST /api/products
- Get All Products: GET /api/products
- Get Product by ID: GET /api/products/:id
- Update Product: PUT /api/products/:id
- Delete Product: DELETE /api/products/:id
- Get Products by Category and Status: GET /api/products?category=:category_id&status=:status
- Search Products: GET /api/products/search?query=:query