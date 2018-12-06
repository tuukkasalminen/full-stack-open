let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const blogs = [
{
_id: "5bfd6874087558111c6c1494",
title: "moimoi",
author: "moimoi",
url: "heimoi",
likes: 7,
user: {
_id: "5bf56e5c915cc1204cd6843b",
username: "matti meikalainen",
name: "matti"
},
__v: 0
},
{
_id: "5bfea0e0a198040b9446ecd2",
title: "asd",
author: "matti",
url: "000",
likes: 25,
user: {
_id: "5bf56e5c915cc1204cd6843b",
username: "matti meikalainen",
name: "matti"
},
__v: 0
},
{
_id: "5c0666aae9ef79272ca3dbe9",
title: "viikkotehtävä 4",
author: "matti",
url: "abc.com",
likes: 8,
user: {
_id: "5bf56e5c915cc1204cd6843b",
username: "matti meikalainen",
name: "matti"
},
__v: 0
},
{
_id: "5c068097af24a50768ec2c42",
title: "viikkotehtävä 1",
author: "matti",
url: "000",
likes: 2,
user: {
_id: "5bf56e5c915cc1204cd6843b",
username: "matti meikalainen",
name: "matti"
},
__v: 0
}
]

const getAll = () => {
    return Promise.resolve(blogs)
  }
  
  export default { getAll, blogs, setToken }