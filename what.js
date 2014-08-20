Consider using 'dppx' units, as in CSS 'dpi' means dots-per-CSS-inch, not dots-per-physical-inch, so does not correspond to the actual 'dpi' of a screen. In media query expression: only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 144dpi) 
a = ["anne", "bob", "charles", "daniel", "ecstasy"];
["anne", "bob", "charles", "daniel", "ecstasy"]
a;
["anne", "bob", "charles", "daniel", "ecstasy"]
a[4];
"ecstasy"
a[4];
"ecstasy"
a[3];
"daniel"
a[2];
"charles"
a[1];
"bob"
a[1] = "bitch";
"bitch"
a;
["anne", "bitch", "charles", "daniel", "ecstasy"]
temp = a[2];
"charles"
a[3] = temp;
"charles"
a[2] = a[3];
"charles"
a;
["anne", "bitch", "charles", "charles", "ecstasy"]
a = ["anne", "bob", "charles", "daniel", "ecstasy"];
["anne", "bob", "charles", "daniel", "ecstasy"]
a;
["anne", "bob", "charles", "daniel", "ecstasy"]
temp = a[2];
"charles"
a;
["anne", "bob", "charles", "daniel", "ecstasy"]
temp;
"charles"
a[2];
"charles"
a[2] = a[3];
"daniel"
a;
["anne", "bob", "daniel", "daniel", "ecstasy"]
a[3] = temp;
"charles"
a;
["anne", "bob", "daniel", "charles", "ecstasy"]
swap(2,3);
ReferenceError: swap is not defined
swap = function(a, i, j) { var temp = a[i]; a[i] = a[j]; a[j] = temp; }
function (a, i, j) { var temp = a[i]; a[i] = a[j]; a[j] = temp; }
a;
["anne", "bob", "daniel", "charles", "ecstasy"]
swap(a, 0, 1);
undefined
a;
["bob", "anne", "daniel", "charles", "ecstasy"]
swap(a, 0, 1);
undefined
a;
["anne", "bob", "daniel", "charles", "ecstasy"]
swap(a, 3, 1);
undefined
a;
["anne", "charles", "daniel", "bob", "ecstasy"]