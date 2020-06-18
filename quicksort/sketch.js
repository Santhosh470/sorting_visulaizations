

let w = 10;
let states = [];
let values = [];

function setup() {
  let completed = 0
  createCanvas(windowWidth,windowHeight)
  values = new Array(floor(width/w));
  for (let i=0; i< values.length;i++){
    values[i] = random(height);
    states[i] = -1;
  }
  QuickSort(values, 0, values.length-1)
  completed = 1

}

function draw() {
  background(0);
  for (let i=0; i<values.length; i++){
    noStroke();
    if(states[i] == 0){
      fill("#E0777D")
    } else if (states[i] == 1){
      fill("#D6FFb7");
    }
    else{
      fill(255);

    }
    rect(i*w, height- values[i], w, values[i] );   
}
  
}

async function QuickSort(arr, start, end){
  if (start >= end){
    return;
  }
  let index = await partition(arr, start, end)
  states[index] = -1;
  await Promise.all([QuickSort(arr, start, index - 1), 
                     QuickSort(arr, index +1, end) ]);
  
}
async function partition(arr, start, end){
  for (let i =start; i< end; i++){
    states[i] = 1;
  }
  let pivotIndex = start;
  states[pivotIndex] = 0;
  let pivotValue = arr[end];
  for(let i =start; i < end; i++){
    if (arr[i]< pivotValue){
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);
  for (let i =start; i<end; i++){
    if(i != pivotIndex){
      states[i] = -1;
    }
  }
  return pivotIndex;
}

async function swap(arr, a,b){
  await sleep(100);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
 
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}


