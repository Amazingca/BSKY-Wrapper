### Blue Wrapper, Version 2 – React.js & web redesign

This is a very ambitious project which intends to revamp the current iteration of the Blue Wrapper.

Thoughtful consideration was made on whether such update should be made, and it was ultimately decided that using a library to render the DOM would be scalable in the long run.

At the moment, a majority of the web interface has been redesigned, and media which showcases that progress will be available in the future. It should be noted that  provided media is only for demonstrational purposes and may not reflect what comes in the final product.

Being that this project is intended to provide long-term stability for the wrapper, many features will be split into smaller, more fundamental chunks. This will massively improve clarity, at the cost of minor efficiency tradeoffs.

Direct DOM modification is certainly faster in many cases, though the complexities of a social experience using that method can oftentimes slow production, and in many cases, product efficiency.

While this project is being worked on, necessary updates will be pushed to the [main branch](https://github.com/Amazingca/BSKY-Wrapper) as they arise.

## Current progress

### Jan 27, 2024

In this most recent push, I have pre-added the baseline files which are meant to structure the fundamental aspects of the wrapper. Above the API handler, which has yet to meet the necessary goals for this current iteration, these files are critical to providing solid scalablity in the future. In addition, I have added the prerequisite package files for the React version that will be adopted (Remix). 

Just to clarify, nothing in this area has been started yet. However, I find it useful to outline the processes and wireframe which shapes the core parts of the web-interface.

### Dec 21, 2023

Current effort is being made on the lowest level, the API handler. This is arguably the most important code for the entire program, as its capabilites depend on what information can be sent and recieved. 

For the case of any decentralized social networking technology, it is important that there be a strong focus on portability and dimensionality. I've opted into a class-based API handler, with the prospect that this will greatly enhance future capabilities.

Ostensibly, this might come to the likes of some developers who used the previous [handler](https://github.com/Amazingca/BSKY-Wrapper/blob/main/api.js) to interact with the protocol. I hope that the new model enables them with the same, if not more potential.

While many of the core features have yet to be implemented, for added benefit, each current method has been given its own JSDoc to provide any developer who wishes to use them added clarity.

<!--### Some final words

The Blue Wrapper was not a project I thought I would continue working on. At the time I started building it in Febuary, it was originally my intention to view basic information and posts, but nothing on the scale as it has come to.

However, the response I've received has given me reason to continue adding and refining features which set it apart. I am deeply grateful for those who continue to support it.-->


### Disclaimer:
This client is not owned or maintained by Bluesky. This is a personal project that allows others to view the posts on the platform through a modern web interface.

### Current capabilities can be viewed on the [roadmap](https://github.com/users/Amazingca/projects/2/views/1).
