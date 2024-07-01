let container = document.querySelector('.container');
let card = container.children[0];
let close = document.querySelector('.close');
let heart = document.querySelector('.heart');

let arr = [
  {
    id: "1",
    name: "Jessica",
    age: 23,
    url: "./images/01.jpg"
  },
  {
    id: "2",
    name: "Jane",
    age: 24,
    url: "./images/02.jpg"
  },
  {
    id: "3",
    name: "Helena",
    age: 37,
    url: "./images/03.jpg"
  },
  {
    id: "4",
    name: "Jennifer",
    age: 21,
    url: "./images/04.jpg"
  },
  {
    id: "5",
    name: "Olivia",
    age: 16,
    url: "./images/05.jpg"
  }
]

let preScale = 85;
let remScale = 100 - preScale;
let range = 300;

let index = 0;

class NewCard {
  constructor(isDraggable = false, i, cardName = "", cardAge, cardUrl = "") {
    let newCard = document.createElement("div");
    newCard.classList.add("card");

    if (isDraggable == false) {
      let like = document.createElement("div");
      like.classList.add("like");
      let nope = document.createElement("div");
      nope.classList.add("nope");
      let overlay = document.createElement("div");
      overlay.classList.add("overlay");
      let name = document.createElement("span");
      name.classList.add("name");
      let age = document.createElement("span");
      age.classList.add("age");

      name.innerText = cardName;
      age.innerText = `, ${cardAge}`;
      like.innerText = "Like";
      nope.innerText = "Nope";

      overlay.appendChild(name)
      overlay.appendChild(age)
      newCard.appendChild(like)
      newCard.appendChild(nope)
      newCard.appendChild(overlay)
      newCard.style.backgroundImage = `url(${cardUrl})`;
    } else {
      newCard.classList.add("undraggable");
      newCard.innerText = "There are no more recommendations. Thank you."
    }
    newCard.style.transformOrigin = `50% 50%`;
    newCard.style.zIndex = `${i}`;

    return newCard;
  }
}

container.addEventListener("touchstart", handleDown);
container.addEventListener("mousedown", handleMouseDown);
container.addEventListener("touchmove", handleMove);
container.addEventListener("mousemove", handleMouseMove);
container.addEventListener("touchend", handleUp);
container.addEventListener("mouseup", handleMouseUp);
// container.addEventListener("touchcancel", (e) => {
//   card.style.left = '0';
//     card.style.top = '0';
//     card.style.transform = 'rotate(0deg)';
//     heart.classList.remove('active');
//     close.classList.remove('active');
// })
// container.addEventListener("mouseout", (e) => {
//   card.style.left = '0';
//     card.style.top = '0';
//     card.style.transform = 'rotate(0deg)';
//     heart.classList.remove('active');
//     close.classList.remove('active');
//     isMouseDown = false;
// })


let clientX, clientY, availX, availY, eligForLeft, eligForRight, availRangeLeft, availRangeRight, deltaX, deltaY, moveClientX, isMouseDown = false;


function handleDown(e) {
  clientX = Math.floor(e.touches[0].clientX || e.clientX);
  clientY = Math.floor(e.touches[0].clientY || e.clientY);
  availX = Math.floor(e.target.clientWidth);
  availY = Math.floor(e.target.clientHeight);

  availRangeLeft = clientX.toFixed();
  availRangeRight = Math.abs((availX - clientX).toFixed());

  if ((availRangeLeft * 0.3) >= 250) {
    eligForLeft = 250;
  } else {
    eligForLeft = availRangeLeft * 0.3;
  }

  if ((availRangeRight * 0.4) >= 300) {
    eligForRight = 300;
  } else {
    eligForRight = Math.abs(availRangeRight * 0.4);
  }
}

function handleMouseDown(e) {
  clientX = Math.floor(e.clientX);
  clientY = Math.floor(e.clientY);
  availX = Math.floor(e.target.clientWidth);
  availY = Math.floor(e.target.clientHeight);

  availRangeLeft = clientX.toFixed();
  availRangeRight = Math.abs((availX - clientX).toFixed());

  if ((availRangeLeft * 0.3) >= 250) {
    eligForLeft = 250;
  } else {
    eligForLeft = availRangeLeft * 0.3;
  }

  if ((availRangeRight * 0.4) >= 300) {
    eligForRight = 300;
  } else {
    eligForRight = Math.abs(availRangeRight * 0.4);
  }

  isMouseDown = true;
}

function handleMove(e) {
  deltaX = clientX - e.touches[0].clientX.toFixed();
  deltaY = clientY - e.touches[0].clientY.toFixed();

  moveClientX = e.touches[0].clientX;

  let rotation = (deltaX / 20);
  let rotYMult;

  if (clientY < (availY / 2)) {
    if (moveClientX >= clientX) {
      container.children[0].style.transformOrigin = '75% 100%';
    } else if (moveClientX < clientX) {
      container.children[0].style.transformOrigin = '25% 100%';
    }
    container.children[0].style.transform = `rotate(${rotation * -1}deg)`;
    rotYMult = -0.8;
  } else {
    if (moveClientX >= clientX) {
      container.children[0].style.transformOrigin = '75% 0%';
    } else if (moveClientX < clientX) {
      container.children[0].style.transformOrigin = '25% 0%';
    }
    container.children[0].style.transform = `rotate(${rotation}deg)`;
    rotYMult = -0.8;
  }



  container.children[0].style.left = `${deltaX * -1}px`;
  container.children[0].style.top = `${deltaY * rotYMult}px`;

  if (deltaX >= eligForLeft) {
    container.children[0].querySelector('.nope').style.display = 'inline-block';
    close.classList.add('active');
  } else if (deltaX < eligForLeft) {
    container.children[0].querySelector('.nope').style.display = 'none';
    close.classList.remove('active');
  }

  if ((Math.abs(deltaX) >= eligForRight) && moveClientX.toFixed() > clientX) {
    container.children[0].querySelector('.like').style.display = 'inline-block';
    heart.classList.add('active');
  } else {
    container.children[0].querySelector('.like').style.display = 'none';
    heart.classList.remove('active');
  }
}

function handleMouseMove(e) {
  if (isMouseDown) {
    deltaX = clientX - e.clientX.toFixed();
    deltaY = clientY - e.clientY.toFixed();

    moveClientX = e.clientX;

    let rotation = (deltaX / 20);
    let rotYMult;

    if (clientY < (availY / 2)) {
      if (moveClientX >= clientX) {
        container.children[0].style.transformOrigin = '75% 100%';
      } else if (moveClientX < clientX) {
        container.children[0].style.transformOrigin = '25% 100%';
      }
      container.children[0].style.transform = `rotate(${rotation * -1}deg)`;
      rotYMult = -0.8;
    } else {
      if (moveClientX >= clientX) {
        container.children[0].style.transformOrigin = '75% 0%';
      } else if (moveClientX < clientX) {
        container.children[0].style.transformOrigin = '25% 0%';
      }
      container.children[0].style.transform = `rotate(${rotation}deg)`;
      rotYMult = -0.8;
    }

    container.children[0].style.left = `${deltaX * -1}px`;
    container.children[0].style.top = `${deltaY * rotYMult}px`;

    if (container.children[0].classList.contains("undraggable") == false) {
      if (deltaX >= eligForLeft) {
        container.children[0].querySelector('.nope').style.display = 'inline-block';
        close.classList.add('active');
      } else if (deltaX < eligForLeft) {
        container.children[0].querySelector('.nope').style.display = 'none';
        close.classList.remove('active');
      }

      if ((Math.abs(deltaX) >= eligForRight) && moveClientX.toFixed() > clientX) {
        container.children[0].querySelector('.like').style.display = 'inline-block';
        heart.classList.add('active');
      } else {
        container.children[0].querySelector('.like').style.display = 'none';
        heart.classList.remove('active');
      }
    }
  }
}

function handleUp(e) {
  if ((deltaX >= eligForLeft) && moveClientX.toFixed() < clientX) {
    if (container.children[0].classList.contains("undraggable")) {
      container.children[0].style.left = '0';
      container.children[0].style.top = '0';
      container.children[0].style.transform = 'rotate(0deg)';
    } else {
      container.children[0].style.left = '-120%';
      removeCard();
    }
    close.classList.remove('active');
    heart.classList.remove('active');
  } else if (deltaX < eligForLeft && moveClientX.toFixed() < clientX) {
    container.children[0].style.left = '0';
    container.children[0].style.top = '0';
    container.children[0].style.transform = 'rotate(0deg)';
    close.classList.remove('active');
    heart.classList.remove('active');
  }

  if ((Math.abs(deltaX) >= eligForRight) && moveClientX.toFixed() > clientX) {
    if (container.children[0].classList.contains("undraggable")) {
      container.children[0].style.left = '0';
      container.children[0].style.top = '0';
      container.children[0].style.transform = 'rotate(0deg)';
    } else {
      container.children[0].style.left = '120%';
      removeCard();
    };
    close.classList.remove('active');
    heart.classList.remove('active');
  } else if (moveClientX.toFixed() > clientX) {
    container.children[0].style.left = '0';
    container.children[0].style.top = '0';
    container.children[0].style.transform = 'rotate(0deg)';
    heart.classList.remove('active');
    close.classList.remove('active');
  }
}

function handleMouseUp(e) {
  if ((deltaX >= eligForLeft) && moveClientX.toFixed() < clientX) {
    if (container.children[0].classList.contains("undraggable")) {
      container.children[0].style.left = '0';
      container.children[0].style.top = '0';
      container.children[0].style.transform = 'rotate(0deg)';
    } else {
      container.children[0].style.left = '-120%';
      removeCard();
    }
    close.classList.remove('active');
    heart.classList.remove('active');
  } else if (deltaX < eligForLeft && moveClientX.toFixed() < clientX) {
    container.children[0].style.left = '0';
    container.children[0].style.top = '0';
    container.children[0].style.transform = 'rotate(0deg)';
    close.classList.remove('active');
    heart.classList.remove('active');
  }

  if ((Math.abs(deltaX) >= eligForRight) && moveClientX.toFixed() > clientX) {
    if (container.children[0].classList.contains("undraggable")) {
      container.children[0].style.left = '0';
      container.children[0].style.top = '0';
      container.children[0].style.transform = 'rotate(0deg)';
    } else {
      container.children[0].style.left = '120%';
      removeCard();
    }
    close.classList.remove('active');
    heart.classList.remove('active');
  } else if (moveClientX.toFixed() > clientX) {
    container.children[0].style.left = '0';
    container.children[0].style.top = '0';
    container.children[0].style.transform = 'rotate(0deg)';
    heart.classList.remove('active');
    close.classList.remove('active');
  }

  isMouseDown = false;
  deltaX = deltaY = clientX = clientY = 0;
}

//card.addEventListener("mousedown", handleDown);
//card.addEventListener("mousemove", handleMove);
//card.addEventListener("mouseup", handleUp);

function removeCard() {
  setTimeout(() => {
    container.removeChild(container.children[0]);
  }, 500);
}

function createNewCard(i) {

  if (arr[index] != null || arr[index] != undefined) {
    let card = new NewCard(false, i, arr[index].name, arr[index].age, arr[index].url);
    container.appendChild(card);
  } else {
    let card = new NewCard(true, i);
    container.appendChild(card);
  }
}

for (let i = arr.length; i >= 0; i--) {
  createNewCard(i);
  console.log(i);
  index = index + 1;
}

