Responsive-Images
=================

This lightweight script optimizes images for responsive design. Quickly rendering the image in the correct size and for retina images without the use of cookies or server-side calls.


HOW TO USE
----------

Embed this file at the bottom of the body tag. If you wish to place it in the head use 

&lt;script type="text/javascript" src="responsive.min.js" async defer&gt;&lt;/script&gt;


To make images responsive, place them in the page using data-src instead of src:

&lt;img data-src="path/to/image.jpg" height="y" width="x" alt="This is a responsive image"&gt;<br />
&lt;noscript&gt;<br />
&lt;!-- If there's no javascript, just load it like normal --&gt;<br />
&lt;img src="path/to/image.jpg" height="y" width="x" alt="This is a responsive image"&gt;<br />
&lt;/noscript&gt;<br />

The img tag can be used like a regular image tag. You can link it, wrap it in another element, add ids/classes, etc.


