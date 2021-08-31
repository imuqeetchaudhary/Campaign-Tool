# Backend Deployment Link

https://campaign-tool-restapi.herokuapp.com/

# Impementation by Abdul Muqeet Arshad

## Routes for Campaigns

### to add a new campaign

- campaign/add :post

```js
{
    campaignType: {
        type: String
    },
    thematic: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    actions: [
        {
            actionType: {
                type: String
            },
            target: {
                type: String
            },
            age: {
                type: String
            },
            gender: {
                type: String
            },
            channelType: {
                type: String
            },
            channelCost: {
                type: Number
            },
            channelVolume: {
                type: Number
            },
        }
    ]
}
```

### to get campaigns by year

- campaign/get-by-year :post

```js
{
    companyId: String,
    year: String
}
```

### to download excel file of campaigns by year

- campaign/get-excel :post

```js
{
    companyId: String,
    year: String
}
```

### to delete a campaign

- campaign/delete/:id: :delete

### to get all inprogress campaigns of a single company

- campaign/get-all-inprogress-campaigns/:id: :post { where id = companyId }

### to get all completed campaigns of a single company

- campaign/get-all-completed-campaigns/:id: :post { where id = companyId }

### to update a campaign

- campaign/update/:id: :patch

```js
{
    campaignType: {
        type: String
    },
    thematic: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    actions: [
        {
            actionType: {
                type: String
            },
            target: {
                type: String
            },
            age: {
                type: String
            },
            gender: {
                type: String
            },
            channelType: {
                type: String
            },
            channelCost: {
                type: Number
            },
            channelVolume: {
                type: Number
            },
        }
    ]
}
```

### to get a user's company

- campaign/get-user-company :get

### to update a company

- campaign/update-company/:id: :patch

```js
{
  company: String;
}
```

### to get a single campaign

- campaign/get-campaign/:id: get

### to get all users

- campaign/get-all-users :get

### to add a user company

- campaign/add-user-company :post

```js
{
    userId: String,
    companyName: String
}
```

---

# Impementation by Ilyas

### Note

- Add .env file ad project level (mean campaign-tool directry)
- in .env add below line

```
JWT_SECRET_KEY = jwtprivatekey
```

## Routes for users

### to register a new user

- auth/register :post

```
{
    username:
    password:
}
```

### to login a user

- auth/login :post

```
{
    username:
    password:
}
```

-response

```
{
    username:
    password:
    isMember:
    token:  (jwt)
}
```

### To get all users

- user/all :get (protected route token required)
- response back

```
{
    "users": [
        {
            "_id":
            "username":
            "password":
            "company":
            "companiesAccess": [
                {
                    "company":
                }
            ]
        },
    ]
}

```

### To get A specific user detail

- user/:id :get (protected route token required)
  Response Back

```
{
    username:
    password:
    company:
    isMember:
}
```

### To update A specific user detail

- user/update/:id :put (protected route token required)

```
{
    username:
    password:
    company:
}
```

### To request for company Acesss

- user//send-mail :post

```
{
    company:
}
```

### To Add user to company access

- user/add/company-access :put
- Request.body

```
{
    "id": (those users who request for company access)
    "name": (company name)
}
```

### Create A company

- company/create (protected route Token required) :post
- Req.body

```
{
    name:
    id: (user id)
}
```

- Res.body

```
{
    "message":
    "company": {
        "userAccess": []
        "_id":
        "company":
    }
}
```

### Update A Company

- company/update:id :post (protected route token required)
- Req.body

```
{
    company:
}
```

### get All Companies

- company/all :get (protected Route roken required)

### To delete A specific user

- user/delete/:id :delete (protected route token required)
- Response Back

```
{
    message:
}
```

### TO create campaign

- campagin/create-campagin (protected route token required) :post

```
{
    thematic:
    campagin_type:
    start_date:
    end_date:
    actions:[
        _id
    ],
    company: _id
    isComplete: (*optional*)
    note: (**optional)

}
```

### to Update Campagin

- campagin/update-campagin/:id (protected route token required) :put

```
{
    thematic:
    campagin_type:
    start_date:
    end_date:
    actions:[
        _id
    ]
    company: _id
    isComplete:
    note:
}
```

### To Delete Campagin

- campagin/delete-campagin/:id (protected route token required) :delete

### to get company campagin

- campagin/get-campagin : post (protected route token required)
- req.body take

```
{
    company:
}
```

- response back

```
{
    inProgress:[
         {
            "isComplete":
            "actions": [
                {
                    "_id":
                    "action_type":
                }
            ]
            "_id":
            "thematic":
            "start_date":
            "end_date":
            "creater": (user id)
        }
    ]
    complete:[
         {
            "isComplete":
            "actions": [
                {
                    "_id":
                    "action_type":
                }
            ]
            "_id":
            "thematic":
            "start_date":
            "end_date":
            "creater": (user id)
        }
    ]
}
```

### To get a campagin detail

- campagin/detail/:id :get (protected route token required)
- Response Back

```
{
    "isComplete":
    "actions": [
        {
            "channels": [
                {
                    "_id":
                    "channel_type":
                    "cost":
                    "volumn":
                }

            ]
            "_id":
            "action_type":
            "target":
        }
    ]
    "_id":
    "thematic":
    "start_date":
    "end_date":
    "creater":
}
```

### Create an Action

- campagin/create-action :post (protected route token required)

```
{
    action_type:
    target:
    channelArray:[
        {
            channel_type:
            volumn:
            cost:
        }
    ]
}
```

### to update Action

- campagin/action-update :put (protected route token required)

```
{
    action_type:
    target:
    channelArray:[
        {
            channel_type:
            volumn:
            cost:
        }
    ]
}
```

### to delete Action

- campagin/action-delete/:id :delete (protected route token required)

### Get campagins Calender(Marketing Plan)

- campagin/marketing-plan :get (protected route token required)
- req.body

```
{
    year:
    company:
}
```

- Response Back

```
[
    {
       "month": "August",
       "S1": [],
       "S2": [],
       "S3": [],
       "S4": [
           {
               "isComplete":
               "actions": [
                   "6123445fdc497211fc5212cb"
               ],
               "_id":
               "thematic":
               "start_date":
               "end_date":
               "creater":
               "__v": 0
           }
       ]
   },

]
```

### Export Calender

- campagin/get-excel :get (protected route token required)
- req.body

```
{
    year:
    company:
}
```

- Response Back

```
[
    {
       "month": "August",
       "S1": [],
       "S2": [],
       "S3": [],
       "S4": [
           {
               "isComplete":
               "actions": [
                   "6123445fdc497211fc5212cb"
               ],
               "_id":
               "thematic":
               "start_date":
               "end_date":
               "creater":
               "__v": 0
           }
       ]
   }

]
```
