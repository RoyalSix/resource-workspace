function Matrix(height, width) {
  this.matrix = Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
  this.console = () => {
    console.log(this.matrix.map((el) => JSON.stringify(el)).join('\n'));
  };
  this.fillRect = (x, y, h, w) => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        this.matrix[y + j][x + i] = 1;
      }
    }
  };
  this.getXY = (height, width) => {
    const position = { x: 0, y: 0 };
    const max = { x: this.matrix[0].length - 1, y: this.matrix.length - 1 };
    let find = false;

    for (let y = 0; y <= max.y; y++) {
      const line = this.matrix[y];

      for (let x = 0; x <= max.x; x++) {
        const val = line[x];

        if (val === 1) {
          find = false;
        } else {
          position.x = x;
          position.y = y;
          find = true;

          for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
              if (position.x + i > max.x || position.y + j > max.y) {
                find = false;
                break;
              } else {
                if (this.matrix[position.y + j][position.x + i] === 1) {
                  find = false;
                  break;
                }
              }
            }

            if (!find) {
              break;
            }
          }

          if (find) {
            return position;
          }
        }
      }
    }
  };
}

const calculateHeight = (layout) => {
  let maxHeight = 0;

  if (layout.length > 0) {
    layout.forEach((el) => {
      maxHeight = Math.max(maxHeight, el.h + el.y);
    });
  }
  return maxHeight;
};

const fillMatrix = (matrix, layout) => {
  if (layout.length > 0) {
    layout.forEach((el) => {
      matrix.fillRect(el.x, el.y, el.h, el.w);
    });
  }
  return matrix;
};

const getFilledMatrix = (layout, cols) => {
  const matrix = new Matrix(calculateHeight(layout) + 4, cols);
  fillMatrix(matrix, layout);
  return matrix;
};

/**
 * All the code above is needed for calculations. We use only this method.
 * At the entrance we get the layout, the number of columns, the height and width of the card that we want to place.
 * The method calculates the coordinates where the card can be placed.
*/
export const getXY = (layout, cols, height, width) => {
  const matrix = getFilledMatrix(layout, cols);
  return matrix.getXY(height, width);
};
