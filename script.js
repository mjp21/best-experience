const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close menu":"Open menu");});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
const revealItems=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target);}}),{threshold:.12});revealItems.forEach(item=>observer.observe(item));}else{revealItems.forEach(item=>item.classList.add("visible"));}
const galleryGroups=[
 {elementId:"classGallery",photos:[["g7/1.jpeg","Grade 7 classroom moment"],["g7/2.jpeg","Grade 7 classroom moment"],["g7/3.jpeg","Grade 7 classroom moment"],["g7/4.jpeg","Grade 7 classroom moment"],["g8/1.jpeg","Grade 8 classroom moment"],["g9/1.jpeg","Grade 9 classroom moment"],["g9/2.jpeg","Grade 9 classroom moment"],["g9/3.jpeg","Grade 9 classroom moment"],["g9/4.jpeg","Grade 9 classroom moment"],["g9/5.jpeg","Grade 9 classroom moment"],["g10/g10.jpeg","Grade 10 classroom moment"]]},
 {elementId:"teachGallery",photos:[["teach/1.jpeg","Teaching and learning"],["teach/2.jpeg","Teaching and learning"],["teach/3.jpeg","Teaching and learning"],["teach/4.jpeg","Teaching and learning"],["teach/5.jpeg","Teaching and learning"],["teach/6.jpeg","Teaching and learning"],["teach/7.jpeg","Teaching and learning"],["teach/8.jpeg","Teaching and learning"]]},
 {elementId:"teacherGallery",photos:[["maam ferrer/1.jpeg","With Ma’am Shernalyn M. Ferrer"],["maam ferrer/2.jpeg","With Ma’am Shernalyn M. Ferrer"]]}
];
const allPhotos=[];
galleryGroups.forEach(group=>{const container=document.getElementById(group.elementId);group.photos.forEach(([src,caption])=>{const figure=document.createElement("figure");figure.className="gallery-photo reveal";const img=document.createElement("img");img.src=src;img.alt=caption;img.loading="lazy";img.addEventListener("error",()=>{figure.classList.add("missing-photo");figure.innerHTML=`<span>✧</span><small>${src}</small>`;figure.style.cursor="default";},{once:true});const cap=document.createElement("figcaption");cap.textContent=caption;figure.append(img,cap);container.appendChild(figure);allPhotos.push({src,caption,figure});if("IntersectionObserver" in window){const ro=new IntersectionObserver((entries,o)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");o.unobserve(e.target);}}),{threshold:.12});ro.observe(figure)}else figure.classList.add("visible");});});
const lightbox=document.getElementById("lightbox"),lightboxImage=document.getElementById("lightboxImage"),lightboxCaption=document.getElementById("lightboxCaption");
let activePhotoIndex=0;
function showPhoto(index){activePhotoIndex=(index+allPhotos.length)%allPhotos.length;const photo=allPhotos[activePhotoIndex];lightboxImage.src=photo.src;lightboxImage.alt=photo.caption;lightboxCaption.textContent=photo.caption;lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function hideLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");lightboxImage.src="";document.body.style.overflow="";}
allPhotos.forEach((photo,index)=>photo.figure.addEventListener("click",()=>{if(!photo.figure.classList.contains("missing-photo"))showPhoto(index);}));
document.getElementById("lightboxClose").addEventListener("click",hideLightbox);
document.getElementById("lightboxPrev").addEventListener("click",()=>showPhoto(activePhotoIndex-1));
document.getElementById("lightboxNext").addEventListener("click",()=>showPhoto(activePhotoIndex+1));
lightbox.addEventListener("click",event=>{if(event.target===lightbox)hideLightbox();});
document.addEventListener("keydown",event=>{if(!lightbox.classList.contains("open"))return;if(event.key==="Escape")hideLightbox();if(event.key==="ArrowLeft")showPhoto(activePhotoIndex-1);if(event.key==="ArrowRight")showPhoto(activePhotoIndex+1);});
