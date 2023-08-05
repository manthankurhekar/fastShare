const dropZone = document.querySelector('.drop-zone');
// console.log(dropZone);
const browseBtn = document.querySelector('.browseBtn');
const fileInput = document.querySelector('#fileinput');

// dropZone.addEventListener("dragstart", (e) => {
//       // console.log("Hello!");
//       e.dataTransfer.effectAllowed = "all";
//       console.log(e.dataTransfer.effectAllowed);      
// });

dropZone.addEventListener("dragover", (e) => {  
      e.preventDefault();
      console.log("Dragging!");
      if(!dropZone.classList.contains('dragged')) {
            dropZone.classList.add('dragged');
      }
});

dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      console.log(e.dataTransfer.files.length);
      dropZone.classList.remove("dragged");
      // logic add karna baki h if file dragged dropped then upload nahi hoga
});

browseBtn.addEventListener("click", () => {
      fileInput.click();
});

const uploadFile = () => {
             
};