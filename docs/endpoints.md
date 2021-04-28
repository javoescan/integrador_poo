|Método|Endpoint|Headers|Body|Response|
|---|---|---|---|---|
|POST|/users/login|N/A|{ email, password }|{ jwt: 'jwt' }
|GET|/products/:id?page=1&limit=10|N/A|N/A|[{ id, name, price }]
|GET|/redeems/users/:userId?page=1&limit=10|Authorization: bearer {jwt}|[{ id, userId, products: { id, price }, date }]|{ credits }
|POST|/redeems|Authorization: bearer {jwt}|[productId1, productId2, ...]|{ credits }
