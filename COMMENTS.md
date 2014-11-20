~/Sites/gif-gallery: slc loopback:model
[?] Enter the model name: Gallery
[?] Select the data-source to attach Gallery to: db (memory)
[?] Select model's base class: PersistedModel
[?] Expose Gallery via the REST API? Yes
[?] Custom plural form (used to build REST URL): Galleries
Let's add some Gallery properties now.

Enter an empty property name when done.
[?] Property name: Title
   invoke   loopback:property
[?] Property type: string
[?] Required? Yes

Let's add another Gallery property.
Enter an empty property name when done.
[?] Property name: Description
   invoke   loopback:property
[?] Property type: string
[?] Required? No

Let's add another Gallery property.
Enter an empty property name when done.
[?] Property name: Gifs
   invoke   loopback:property
[?] Property type: array
[?] The type of array items: object
[?] Required? No

Let's add another Gallery property.
Enter an empty property name when done.
[?] Property name: Url
   invoke   loopback:property
[?] Property type: string
[?] Required? Yes

Let's add another Gallery property.
Enter an empty property name when done.
[?] Property name:
~/Sites/gif-gallery: ls
client    common    node_modules  package.json  server
~/Sites/gif-gallery: slc run
INFO strong-agent not profiling, StrongOps configuration not found.
Generate configuration with:
    npm install -g strongloop
    slc strongops
See http://docs.strongloop.com/strong-agent for more information.
supervisor running without clustering (unsupervised)
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/