
export function setDivVisibility(invisible: boolean) {
    var div = document.getElementById('toggleDiv');
    if (invisible && div) {
      div.style.display = 'none';
    } else  if (!invisible && div){
      div.style.display = 'block';
    }
}
