

const validDirection = {
  north: 'north',
  east: 'east',
  south: 'south',
  west: 'west'
}

const instructions = {
  L: (coordinates) => {
    const index = Object.keys(validDirection).findIndex(el => el === coordinates.direction)
    coordinates.direction = (index - 1) < 0 ? 'west' : Object.keys(validDirection)[index - 1];
  },
  R: (coordinates) => {
    const index = Object.keys(validDirection).findIndex(el => el === coordinates.direction)
    coordinates.direction = (index + 1) > 3 ? 'north' : Object.keys(validDirection)[index + 1];
  },
  A: (coordinates) => {
    const index = Object.keys(validDirection).findIndex(el => el === coordinates.direction)
    if (index === 0) {
      coordinates.y++;
    }
    if (index === 1) {
      coordinates.x++;
    }
    if (index === 2) {
      coordinates.y--;
    }
    if (index === 3) {
      coordinates.x--;
    }
  },
}

export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

export class Robot {
  #coord = { x: 0, y: 0, direction: 'north' }

  get bearing() {
    return this.coord.direction;
  }

  get coordinates() {
    return [this.coord.x, this.coord.y];
  }

  get coord() {
    return this.#coord;
  }

  set coord(coordinates) {
    this.#coord = coordinates;
  }

  place({ x, y, direction }) {
    if (!validDirection[direction]) {
      throw new InvalidInputError();
    }
    this.coord = { x, y, direction };
  }

  evaluate(instruction) {
    instruction.split('').forEach(element => {
      instructions[element](this.coord)
    });
  }
}
