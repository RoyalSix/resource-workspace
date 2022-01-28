# Resource Workspace RCL

The resource workspace RCL is an adaptation or simplification of [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) which is a draggable and resizable grid layout with responsive breakpoints, for React.

## API

The API documentation of the Workspace React component. Learn more about the props and the CSS customization.

## Understanding React-Grid-Layout

Note that this react component is explored largely via its use in the unfoldingWord RCL `resource-workspace-rcl`.

## Status

This document currently has the following outstanding needs:
- What are `layoutWidths` and `layoutHeights` ? when should they be used? are they required?
- What are `minW` and `minH`? when should they be used? required?
- What does `rows` do? when should it be used?
- What does `totalGridUnits` do? when should it be used?
- What does `rowHeight` do? when should it be used?
- What is the unit of measure for `gridMargin`?
- What is the unit of measure for `correctHeight`?
- What does `columns` do? When should it be used? How is it different from `breakpoints`?
- What does `breakpoints` do? When should it be used? How is it different from `columns`?

## Links
- Link to the demos: https://strml.github.io/react-grid-layout/examples/1-basic.html
- Link to the "showcase": https://strml.github.io/react-grid-layout/examples/0-showcase.html (this has few restrictions of moving and sizing)
- Link to Styleguidist documentation for `resource-workspace-rcl`: https://resource-workspace.netlify.app/


## breakpoint

A breakpoint specifies where to re-layout the children components into columns based on screen sizes.

Example:
```js
const breakpoints = { lg: 900, md: 700, sm: 500 };
```

This set of breakpoints uses 900, 700, and 500. The numbers are relative and the above could be re-written as:

```js
const breakpoints = { lg: 9, md: 7, sm: 5};
```

For each size of display, this specifies how many columns should be used to layout the children components. Thus:
- `lg` will allow 9 columns
- `sm` will allow only 5

## layout

Since the placement of the children components is constrained by the size of the screen, then a layout is associated with a "screen size", which must match one of the breakpoint property names.

Example:
```js
const layout = {
  lg: [
    {"w":6,"h":1,"x":0,"y":0,"i":"1"},
    {"w":6,"h":1,"x":6,"y":2,"i":"2"},
    {"w":6,"h":1,"x":0,"y":2,"i":"3"},
    {"w":6,"h":1,"x":6,"y":0,"i":"4",static:true},
    {"w":12,"h":1,"x":0,"y":1,"i":"5"},
  ]
};
```
This layout only provides placements for a large ("lg") screen size.

A *layout* is an object of breakpoint names, which have an array of objects, one per child component, with positioning information, namely (using the breakpoints above):

- "w": the width in number of columns to take up (1 to 8 for the "lg" example above)
- "h": the height in number of rows, which is inferred from the max "y" coordinate in the layout (*is this true?*)
- - "x": the horizontal coordinate. Zero based. Starting from left side of the container.
	- A number from 0 to 8 for the "large" (lg) 
- "y": the vertical coordinate. Zero based. Starting from the top of the container.
- "i": the unique number for the component. In the above, it goes from "1" to "5" (strings, not numbers).
- "static": this is optional and defaults to false. If set to true, then that child component cannot be moved or resized.

Consider the layout used [here](https://resource-workspace.netlify.app/#!/Workspace/1):

```js
const layout = {
  lg: [
    {"w":6,"h":1,"x":0,"y":0,"i":"1"},
    {"w":6,"h":1,"x":6,"y":2,"i":"2"},
    {"w":6,"h":1,"x":0,"y":2,"i":"3"},
    {"w":6,"h":1,"x":6,"y":0,"i":"4"},
    {"w":12,"h":1,"x":0,"y":1,"i":"5"},
  ]
};
```
In this layout there are 5 components and only an inferred breakpoint named "lg". The components are laid out in order of appearance. Therefore:
- Component 1 will be positioned at first at the top at (0,0) and will take up 6 columns.
- Component 4 will be positioned next. Even tho the x,y location is specified to be (6,0), it will fill the entire space since it has width 6. In other words x is overriden to be 0.
- Component 5 is next with x,y of (0,1). Even tho the y coordinate is 1, it is forced to y=2 in order to make room for components 1 and 4. *I do not understand why the width of 12 is essentially ignored. Some testing show that the screen has only six columns.*
- Component 2 is next with x,y of (6,2). Since its width is 6, it fills the space. Since it must make room for the other components already positioned, it is forced to y=3. Thus its effective x,y is (0,3).
- Component 3 is last, filling the space since width is 6. Since it must make room for the other components placed, its effective x,y is (0,4).

This behavior leads to these observations:
1. The layout of components is only a suggestion, since...
2. Components are not permitted to obscure one another
3. Components will always be full visible in the parent container
4. Component placement is prioritized per the order in the layout breakpoint array

Consider this rather extreme example. Here the components all have width 2 (I would have used 1, but then the text bleeds outside the cards). All have height 1. All are positioned at (0,0) in the top left corner.
```
const layout = {
  lg: [
    {"w":2,"h":1,"x":0,"y":0,"i":"1"},
    {"w":2,"h":1,"x":0,"y":0,"i":"2"},
    {"w":2,"h":1,"x":0,"y":0,"i":"3"},
    {"w":2,"h":1,"x":0,"y":0,"i":"4"},
    {"w":2,"h":1,"x":0,"y":0,"i":"5"},
  ]
};
```
The result will be the components arranged vertially in a single column.

## layoutWidths and layoutHeights
The documentation says these are arrays of arrays of numbers.
Example:
```js
const layoutWidths = [[1, 1], [1, 1], [1]];
```

It is not known what these are used for, nor if they are needed.

## minH and minW

The component properties says these are numbers, but no other info is provided.

## rows

The documentation says this is a number and is *The number of lines in the grid that fit on 1 screen.* The default is 12.

## totalGridUnits

A number defaulting to 12. But do not know its purpose.

## rowHeight

A number defaulting to 100. But no info is provided as to its purpose or its unit of measure.

## gridMargin

An array of 2 numbers, defaulting to `[0,0]`. Unit of measure is unknown. Controls the margin on left and right with first number and top and bottom with second number.

## corrrectHeight

A number defaulting to zero. The documentation states: *If there is an appbar or footer, then you can specify how much to reduce the screen size.*

## columns

A "shape" (whatever that is) and the documentation states:
```
lg: number
md: number
sm: number
xs: number
xxs: number
```

How is this different than a set of breakpoints? (next)

## breakpoints

Is also a "shape" and is described exactly like the `columns` property.

## autoResize

A Boolean, defaulting to false, and is described as:
> Whether it is necessary to automatically recalculate the rowHeight of the cards when the screen is resized so that the cards maintain their proportions relative to the screen.
