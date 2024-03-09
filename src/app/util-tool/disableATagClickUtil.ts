
export function toggleLinkDisabled(disabled:boolean, tagId:string) {
    const link = document.getElementById(tagId);
    if(link){
        if(disabled) {
            link.classList.add('disabled');
            link.addEventListener('click', preventDefaultClick);
          } else {
            link.classList.remove('disabled');
            link.removeEventListener('click', preventDefaultClick);
          }
    }
  }

export function preventDefaultClick(event: Event) {
    event.preventDefault();
  }