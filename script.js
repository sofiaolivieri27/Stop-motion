document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            console.log("Selected Filter:", filter);

            cards.forEach(card => {
                console.log("Card Category:", card.getAttribute("data-category"));

                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block"; 
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});


document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
    });

    document.addEventListener("DOMContentLoaded", function () {
        let currentPage = 1;
        const totalPages = 10;
        const prevButton = document.getElementById("prevPage");
        const nextButton = document.getElementById("nextPage");
        const pageNumbers = document.getElementById("pageNumbers");
        const cardContainer = document.querySelector(".card-container");
    
        function showPage(page) {
            if (page === 1) {
                cardContainer.style.display = "grid"; 
            } else {
                cardContainer.style.display = "none"; 
            }
    
            updatePageButtons();
            prevButton.disabled = page === 1;
            nextButton.disabled = page === totalPages;
        }
    
        function updatePageButtons() {
            pageNumbers.innerHTML = "";
            for (let i = 1; i <= totalPages; i++) {
                let pageBtn = document.createElement("button");
                pageBtn.textContent = i;
                pageBtn.classList.add("page-btn");
                if (i === currentPage) pageBtn.classList.add("active");
                pageBtn.addEventListener("click", function () {
                    currentPage = i;
                    showPage(currentPage);
                });
                pageNumbers.appendChild(pageBtn);
            }
        }
    
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
    
        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    
        showPage(currentPage);
    });

    document.addEventListener("DOMContentLoaded", function () {
        const totalPages = 10;
        const pageNumbersContainer = document.getElementById("pageNumbers");
        const prevButton = document.getElementById("prevPage");
        const nextButton = document.getElementById("nextPage");
    

        function renderPagination() {
            pageNumbersContainer.innerHTML = "";
    
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement("span");
                pageButton.classList.add("page-btn");
                pageButton.textContent = i;
                
                if (i === 1) {
                    pageButton.classList.add("active");
                    pageButton.addEventListener("click", function () {
                        showPage(1);
                    });
                } else {
                    pageButton.classList.add("inactive");
                    pageButton.style.pointerEvents = "none";
                }
    
                pageNumbersContainer.appendChild(pageButton);
            }
    
            prevButton.disabled = true;
            nextButton.disabled = false;
        }
    
        function showPage(pageNumber) {
            console.log("Showing cards for page:", pageNumber);
            

            if (pageNumber === totalPages) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
    
            if (pageNumber === 1) {
                prevButton.disabled = true;
            } else {
                prevButton.disabled = false;
            }
        }
    
        prevButton.addEventListener("click", function () {
            const activePage = parseInt(document.querySelector(".page-btn.active").textContent);
            if (activePage > 1) {
                showPage(activePage - 1);
            }
        });
    
        nextButton.addEventListener("click", function () {
            const activePage = parseInt(document.querySelector(".page-btn.active").textContent);
            if (activePage < totalPages) {
                showPage(activePage + 1);
            }
        });
    
        renderPagination();
        showPage(1); 
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const backToTopButton = document.getElementById("backToTop");
    
        window.addEventListener("scroll", function () {
            if (window.pageYOffset > 100) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });
    
        backToTopButton.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.scrollTop = 0; 
            document.documentElement.scrollTop = 0;
        });
    });
    
    (function () {

        const timeline = document.querySelector(".timeline ol"),
          elH = document.querySelectorAll(".timeline li > div"),
          arrows = document.querySelectorAll(".timeline .arrows .arrow"),
          arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
          arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
          firstItem = document.querySelector(".timeline li:first-child"),
          lastItem = document.querySelector(".timeline li:last-child"),
          xScrolling = 280,
          disabledClass = "disabled";
      

        window.addEventListener("load", init);
      
        function init() {
          setEqualHeights(elH);
          animateTl(xScrolling, arrows, timeline);
          setSwipeFn(timeline, arrowPrev, arrowNext);
          setKeyboardFn(arrowPrev, arrowNext);
        }
      

        function setEqualHeights(el) {
          let counter = 0;
          for (let i = 0; i < el.length; i++) {
            const singleHeight = el[i].offsetHeight;
      
            if (counter < singleHeight) {
              counter = singleHeight;
            }
          }
      
          for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${counter}px`;
          }
        }
      

        function isElementInViewport(el) {
          const rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        }
      

        function setBtnState(el, flag = true) {
          if (flag) {
            el.classList.add(disabledClass);
          } else {
            if (el.classList.contains(disabledClass)) {
              el.classList.remove(disabledClass);
            }
            el.disabled = false;
          }
        }
      

        function animateTl(scrolling, el, tl) {
          let counter = 0;
          for (let i = 0; i < el.length; i++) {
            el[i].addEventListener("click", function () {
              if (!arrowPrev.disabled) {
                arrowPrev.disabled = true;
              }
              if (!arrowNext.disabled) {
                arrowNext.disabled = true;
              }
              const sign = this.classList.contains("arrow__prev") ? "" : "-";
              if (counter === 0) {
                tl.style.transform = `translateX(-${scrolling}px)`;
              } else {
                const tlStyle = getComputedStyle(tl);

                const tlTransform =
                  tlStyle.getPropertyValue("-webkit-transform") ||
                  tlStyle.getPropertyValue("transform");
                const values =
                  parseInt(tlTransform.split(",")[4]) +
                  parseInt(`${sign}${scrolling}`);
                tl.style.transform = `translateX(${values}px)`;
              }
      
              setTimeout(() => {
                isElementInViewport(firstItem)
                  ? setBtnState(arrowPrev)
                  : setBtnState(arrowPrev, false);
                isElementInViewport(lastItem)
                  ? setBtnState(arrowNext)
                  : setBtnState(arrowNext, false);
              }, 1100);
      
              counter++;
            });
          }
        }
      
        function setSwipeFn(tl, prev, next) {
          const hammer = new Hammer(tl);
          hammer.on("swipeleft", () => next.click());
          hammer.on("swiperight", () => prev.click());
        }
      
        function setKeyboardFn(prev, next) {
          document.addEventListener("keydown", (e) => {
            if (e.which === 37 || e.which === 39) {
              const timelineOfTop = timeline.offsetTop;
              const y = window.pageYOffset;
              if (timelineOfTop !== y) {
                window.scrollTo(0, timelineOfTop);
              }
              if (e.which === 37) {
                prev.click();
              } else if (e.which === 39) {
                next.click();
              }
            }
          });
        }
      })();

      document.addEventListener("DOMContentLoaded", function () {
        const loginModal = document.getElementById("loginModal");
        const closeModal = loginModal.querySelector(".close");
        
        const requireLoginElements = document.querySelectorAll(".like-icon, .dislike-icon, .share-icon");
        
        requireLoginElements.forEach((elem) => {
          elem.addEventListener("click", function (e) {
            e.preventDefault(); 
            loginModal.style.display = "block"; 
          });
        });
        
        closeModal.addEventListener("click", function () {
          loginModal.style.display = "none";
        });
        
        window.addEventListener("click", function (e) {
          if (e.target === loginModal) {
            loginModal.style.display = "none";
          }
        });
      });
      
      