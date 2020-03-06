3/1/20
Most of my changes are solely in the Components folder but I have also added a CSS folder with some classes that I've used. The point of this is to detail some ideas and plans I have and maybe get some feedback.

Calendar - I am of course planning on adding a '+' similar to that of the clientlist so that the admin can add an appointment or the client themselves can schedule or suggest an appointment themselves.

Client List - Just a little mock up of something that might work which is the list and the add button that could prompt a popup with an intake form of sorts. I made something very general that you can checkout by just pressing the button yourself. I am either thinking about making the 'view' produce a dropdown that hides the rest of the clients or produces a popup with all their relevant info, let me know what you guys think because I wanna hop on that soon.

To-do List - This will ideally just be a lot of headers thta could make a drop drop but I'm not sure. Haven't put too much thought into it. I think the to do list should also be broken down into some sub categories where appointments will show up right here and x other thing will be in another lil drop down something?

3/5/20
I cleaned some things up visually, messed with some padding that was due to semantics. I decided to add a mock view client button but this isn't really what I want as I detailed above in my last log. Aside from that, I'm going to start thinking about structuring everything differently for when we need everything to rely on passing props and such.

Full Calendar - This calendar looks sooooo good if we get to implement it but tonight while attempting I realized it is going to need webpack as well as adding and needing 4 different things to be bundled with webpack being style-loader, node-sass, sass-loader, css-loader and everything at once was a bit confusing so I've laid off it tonight. It already has a component made but the css behind it is not there because it is a .scss and that's why we need webpack it seems, at least according to their docs. 


