todoListCtr.ctr_nav = function() {
    todoListCtr.loadingSpinner('show');
    if(sessionStorage.getItem('lastVisitedPage')){
        switch(sessionStorage.getItem('lastVisitedPage')){
            case 'view_loginUser':
                todoListCtr.view_loginUser();
                break;
            case 'view_createUser':
                todoListCtr.view_createUser();
                break;
            case 'view_home':
                todoListCtr.view_home();
                todoListCtr.createNavMenu();
                break;
            case 'view_list':
                todoListCtr.view_list();
                todoListCtr.createNavMenu();
                break;
            case 'view_profile':
                todoListCtr.view_profile();
                todoListCtr.createNavMenu();
                break;
            default:
                todoListCtr.view_home();
                todoListCtr.createNavMenu();
                break;
        }
    } else if(localStorage.getItem('token')){
        sessionStorage.setItem('lastVisitedPage','view_home');
        todoListCtr.ctr_nav();
    } else{
        todoListCtr.view_loginUser();
    }
}

todoListCtr.createNavMenu = function(){
    let sideBar = document.querySelector('nav');
    sideBar.id = 'sideBar';
    sideBar.className = 'content-sidemenu';

    navCloseBtn = generateButton('x','closeBtn')
    navCloseBtn.addEventListener('click',function(){
        sideBar.style.display = 'none';
    });
    navHomeBtn = generateButton('Home','navbarBtn')
    navHomeBtn.addEventListener('click',function(){
        sessionStorage.setItem('lastVisitedPage','view_home');
        todoListCtr.ctr_nav();
    });
    navProfileBtn = generateButton('Profile','navbarBtn')
    navProfileBtn.addEventListener('click',function(){
        sessionStorage.setItem('lastVisitedPage','view_profile');
        todoListCtr.ctr_nav();
    });
    navLogoutBtn = generateButton('Log out','navbarBtn')
    navLogoutBtn.addEventListener('click',function(){
        localStorage.clear();
        sessionStorage.clear();
        todoListCtr.view_loginUser();
    });    
    sideBar.appendChild(navCloseBtn);
    sideBar.appendChild(navHomeBtn);
    sideBar.appendChild(navProfileBtn);
    sideBar.appendChild(navLogoutBtn);

    let sideBarOpenBtn = document.querySelector('#openMenuBtn');
    sideBarOpenBtn.addEventListener('click', function(){
        log('Open menu clicked')
        sideBar.style.display = 'block';
    });

    function generateButton(routetitle,routeclass){
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.className = routeclass;
        btn.innerHTML = routetitle;
        return btn;
    }
}