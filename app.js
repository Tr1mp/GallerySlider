window.addEventListener('DOMContentLoaded', () => {
    const defColor = "#361f41";
    const data = [
        {
            name: 'BMW',
            url: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1002&q=80',
            color: "#f3f4f8"
        },
        {
            name: 'Lamborghini',
            url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            color: "#8b711a"
        },
        {
            name: 'Ferrari',
            url: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80',
            color: "#880e2f"
        },
        {
            name: 'Mustang',
            url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            color: "#3a4551"
        },
        {
            name: 'Hyndai',
            url: 'https://images.unsplash.com/photo-1599575654473-4d9a1b766975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            color: "#0b0e13"
        },
        {
            name: 'Camaro',
            url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            color: "#03507a"
        },
        
    ];

    function ejectObj(input, output) {
        input.forEach((obj, i) => {
            return output[i] = `
                <div
                    class="slide"
                    style="
                        background-image: url(${obj.url});
                    ">
                    <h3>${obj.name}</h3>
                </div>
            `
        })
        return output;
    }

    const layout = [];
    const parentSelector = document.querySelector("body");
    const element = document.createElement('div');
    element.classList.add("container");
    ejectObj(data, layout).forEach(arr => element.innerHTML += arr);
    parentSelector.append(element);
    
    const slides = document.querySelectorAll(".slide");
    
    const removeActive = () => {
        slides.forEach(slide => {
            slide.classList.remove("active");
            

        })
    }

    const removeNonActive = () => {
        slides.forEach(slide => {
            slide.classList.remove("nonactive");
        })
    }

    const addNonActive = () => {
        slides.forEach(slide => {
            slide.classList.add("nonactive");
        })
    }
    
    const title = document.querySelector('title'),
          body = document.querySelector("body"),
          names = document.querySelectorAll("h3");
    const textTitle = "ProjectCars";
    body.style.backgroundColor = defColor;
    title.innerHTML = textTitle;
    let intervalId = '';
    const activeTimer = (idSlide = 0) => {
        intervalId = setInterval(() => {
            idSlide = changeSlideByTimer(idSlide);
        }, 4000)
    }
    const changeSlideByTimer = (slide) => {
        normalSlide(slide);
        data.length - 1  === slide ? slide = 0 : slide++;
        return slide;
    }
    activeTimer();

    let idTimeout = '';
    slides.forEach((slide, i) => {
        slide.addEventListener("click", () => {
            if (slide.classList.contains("active")) {
                removeNonActive();
                removeActive();
                body.classList.remove("bgBody");
                body.style.backgroundImage = '';
                title.innerHTML = textTitle;
                clearTimer();
                activeTimer(0);
            } else {
                clearTimer();
                normalSlide(i);
                idTimeout = setTimeout(() => {
                    activeTimer(i);
                }, 10000);
            }
            
        })
    })

    function clearTimer() {
        if (idTimeout) {
            clearTimeout(idTimeout);
        }
        if (intervalId) {
            clearInterval(intervalId);
        }
    }

    function normalSlide(i) {
        addNonActive();
        removeActive();
        slides[i].classList.remove("nonactive");
        slides[i].classList.toggle("active");
        title.innerHTML = data[i].name;
        body.classList.add("bgBody");
        body.style.backgroundImage = `url(${data[i].url})`;
        names.forEach(name => {
            name.style.color = data[i].color;
            if (data[i].color != "#f3f4f8") {
                name.style.textShadow = "-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF";
            } else {
                name.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
            }
            
        });
    }
})
