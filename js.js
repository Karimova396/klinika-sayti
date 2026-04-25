const USERS = [
    { name: "Kumush Karimova", password: "123456", phone: "+998901234567" },
    { name: "admin", password: "admin123", phone: "+998505505050" }
];

let currentUser = null;

function closeOffcanvasAndOpenModal(modalId) {
    const offcanvasEl = document.getElementById("mobileMenu");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (offcanvasInstance) {
        offcanvasEl.addEventListener("hidden.bs.offcanvas", function handler() {
            offcanvasEl.removeEventListener("hidden.bs.offcanvas", handler);
            openModal(modalId);
        });
        offcanvasInstance.hide();
    } else {
        openModal(modalId);
    }
}

function openModal(id) {
    const modal = new bootstrap.Modal(document.getElementById(id));
    modal.show();
}

function closeModal(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(id));
    if (modal) modal.hide();
}

function handleLogin() {
    const name = document.getElementById("loginName").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const errEl = document.getElementById("loginError");

    const user = USERS.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === password);

    if (user) {
        currentUser = user;
        errEl.style.display = "none";
        closeModal("loginModal");
        updateAuthZone();
        document.getElementById("loginName").value = "";
        document.getElementById("loginPassword").value = "";
    } else {
        errEl.style.display = "block";
    }
}

function handleRegister() {
    const name = document.getElementById("regName").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const errEl = document.getElementById("regError");
    const successEl = document.getElementById("regSuccess");

    errEl.style.display = "none";
    successEl.style.display = "none";

    if (!name || !phone || !password) {
        errEl.textContent = "❌ Barcha maydonlarni to'ldiring!";
        errEl.style.display = "block";
        return;
    }

    if (password.length < 6) {
        errEl.textContent = "❌ Parol kamida 6 ta belgidan iborat bo'lishi kerak!";
        errEl.style.display = "block";
        return;
    }

    const exists = USERS.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        errEl.textContent = "❌ Bu foydalanuvchi allaqachon mavjud!";
        errEl.style.display = "block";
        return;
    }

    USERS.push({ name, phone, password });
    successEl.textContent = "✅ Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi tizimga kirishingiz mumkin.";
    successEl.style.display = "block";

    document.getElementById("regName").value = "";
    document.getElementById("regPhone").value = "";
    document.getElementById("regPassword").value = "";

    setTimeout(() => {
        closeModal("registerModal");
        successEl.style.display = "none";
    }, 2000);
}

function handleUchrashuv() {
    const name = document.getElementById("uchName").value.trim();
    const phone = document.getElementById("uchPhone").value.trim();
    const errEl = document.getElementById("uchError");
    const successEl = document.getElementById("uchSuccess");

    errEl.style.display = "none";
    successEl.style.display = "none";

    if (!name || !phone) {
        errEl.textContent = "❌ Ism va telefon raqamni kiriting!";
        errEl.style.display = "block";
        return;
    }

    successEl.textContent = `✅ Hurmatli ${name}, uchrashuvga yozildingiz! Tez orada siz bilan bog'lanamiz.`;
    successEl.style.display = "block";

    document.getElementById("uchName").value = "";
    document.getElementById("uchPhone").value = "";

    setTimeout(() => {
        closeModal("uchrashuvModal");
        successEl.style.display = "none";
    }, 2500);
}

function updateAuthZone() {
    const authZone = document.getElementById("authZone");
    if (currentUser) {
        authZone.innerHTML = `
            <div id="userBadge">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <span>${currentUser.name}</span>
                <button onclick="handleLogout()" style="background:none;border:none;color:#fff;cursor:pointer;font-size:13px;margin-left:6px;" title="Chiqish">✖</button>
            </div>
        `;
    } else {
        authZone.innerHTML = `
            <button class="auth-btn" onclick="openModal('loginModal')">Kirish</button>
            <button class="auth-btn filled" onclick="openModal('registerModal')">Ro'yxatdan o'tish</button>
        `;
    }
}

function handleLogout() {
    currentUser = null;
    updateAuthZone();
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeToggle");
    const offcanvasEl = document.getElementById("mobileMenu");
    
    if (body.classList.contains("light")) {

        body.classList.replace("light", "dark");
        if (offcanvasEl) {
            offcanvasEl.classList.remove("light");
            offcanvasEl.classList.add("dark");
        }

        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
        </svg>`;
    } else {

        body.classList.replace("dark", "light");
        if (offcanvasEl) {
            offcanvasEl.classList.remove("dark");
            offcanvasEl.classList.add("light");
        }

        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars" viewBox="0 0 16 16">
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
        </svg>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const xizmatlarSection = document.getElementById("xizmatlarSection");

    if (xizmatlarSection && typeof Xizmatlar !== "undefined") {
        Xizmatlar.forEach(item => {
            let col = document.createElement("div");
            col.classList.add("col-md-6", "col-lg-4");
            col.innerHTML = `
                <div style="cursor:pointer;" onclick="openXizmatModal(${item.id})">
                    <div class="card mb-3 dynamic-card" style="max-width: 540px; box-shadow: 0 4px 15px rgba(139,30,30,0.15); transition: transform 0.3s, box-shadow 0.3s; border-left: 3px solid brown;"
                        onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 10px 25px rgba(139,30,30,0.25)'"
                        onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(139,30,30,0.15)'">
                        <div class="row g-0">
                            <div class="col-4 d-flex align-items-center justify-content-center p-2">
                                <img src="${item.rasm}"
                                    style="width: 90px; height: 90px; object-fit: cover; border-radius: 10px;"
                                    alt="${item.xizmat}"
                                    onerror="this.src='https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg'">
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h5 class="card-title">${item.xizmat}</h5>
                                    <p class="card-text">${item.desc}</p>
                                    <p class="card-text">
                                        <small class="text-body-secondary">Narxi: <strong style="color: brown;">${item.narx}</strong></small>
                                    </p>
                                    <p class="card-text">
                                        <small style="color: brown; font-weight: 600;">Batafsil →</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            xizmatlarSection.append(col);
        });
    }
});

function openXizmatModal(id) {
    const item = Xizmatlar.find(x => x.id === id);
    if (!item) return;
    document.getElementById("xizmatModalImg").src = item.rasm;
    document.getElementById("xizmatModalImg").onerror = function () {
        this.src = 'https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg';
    };
    document.getElementById("xizmatModalTitle").textContent = item.xizmat;
    document.getElementById("xizmatModalDesc").textContent = item.desc;
    document.getElementById("xizmatModalNarx").textContent = item.narx;
    const modal = new bootstrap.Modal(document.getElementById("xizmatDetailModal"));
    modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
    const SabablarSection = document.getElementById("SabablarSection");

    if (SabablarSection && typeof Sabablar !== "undefined") {
        Sabablar.forEach(item => {
            let col = document.createElement("div");
            col.classList.add("col-md-6", "col-lg-4");
            col.innerHTML = `
                <div class="dynamic-card" style="border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 4px 20px rgba(139,30,30,0.12);transition:transform 0.3s,box-shadow 0.3s;margin-bottom:24px;border-top:4px solid brown;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 10px 30px rgba(139,30,30,0.22)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 20px rgba(139,30,30,0.12)'">
                    <div style="width:100%;height:120px;overflow:hidden;">
                        <img src="${item.rasm}" alt="..." style="width:100%;height:100%;object-fit:contain;display:block;padding:10px;background:#f9f0f0;">
                    </div>
                    <div style="padding:20px;">
                        <p style="color:#333;font-size:15px;line-height:1.6;margin:0;">${item.izoh}</p>
                    </div>
                </div>
            `;
            SabablarSection.append(col);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const ShifokorlarSection = document.getElementById("ShifokorlarSection");

    if (ShifokorlarSection && typeof Shifokorlar !== "undefined") {
        Shifokorlar.forEach(item => {
            let col = document.createElement("div");
            col.classList.add("col-md-6", "col-lg-4");
            col.innerHTML = `
                <div class="dynamic-card" style="border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 4px 20px rgba(139,30,30,0.12);transition:transform 0.3s,box-shadow 0.3s;margin-bottom:24px;border-top:4px solid brown;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 10px 30px rgba(139,30,30,0.22)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 20px rgba(139,30,30,0.12)'">
                    <div style="width:100%;height:400px;overflow:hidden;background:#f9f0f0;">
                        <img src="${item.rasm}" alt="..." style="width:100%;height:100%;object-fit:contain;display:block;">
                    </div>
                    <div style="padding:20px;">
                        <h5 style="color:brown;margin-bottom:8px;">${item.izoh}</h5>
                        <p style="color:#333;font-size:15px;line-height:1.6;margin:0;">${item.doktor}</p>
                    </div>
                </div>
            `;
            ShifokorlarSection.append(col);
        });
    }
});

function desktopSearch() {
    const query = document.getElementById("desktopSearchInput").value.toLowerCase();
    searchAndRedirect(query);
}

function mobileSearch() {
    const query = document.getElementById("mobileSearchInput").value.toLowerCase();
    searchAndRedirect(query);
}

function searchAndRedirect(query) {
    if (!query) return;

    const foundService = Xizmatlar.find(item => 
        item.xizmat.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
    );
    
    if (foundService) {
        openXizmatModal(foundService.id);

        const offcanvasEl = document.getElementById("mobileMenu");
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvasInstance) offcanvasInstance.hide();
        return;
    }

    const foundDoctor = Shifokorlar.find(item => 
        item.izoh.toLowerCase().includes(query) || 
        item.doktor.toLowerCase().includes(query)
    );
    
    if (foundDoctor) {

        document.getElementById("shifokorlar").scrollIntoView({ behavior: "smooth" });
        if (offcanvasEl && offcanvasInstance) offcanvasInstance.hide();
        return;
    }

    alert("Hech qanday xizmat yoki shifokor topilmadi!");
}

document.addEventListener("DOMContentLoaded", () => {
    const offcanvasEl = document.getElementById("mobileMenu");
    if (offcanvasEl) {
        if (document.body.classList.contains("light")) {
            offcanvasEl.classList.add("light");
        } else {
            offcanvasEl.classList.add("dark");
        }
    }
});

function closeMobileMenuAndScroll(targetId) {

    const offcanvasEl = document.getElementById("mobileMenu");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    
    if (offcanvasInstance) {
        offcanvasInstance.hide();

        offcanvasEl.addEventListener("hidden.bs.offcanvas", function handler() {
            offcanvasEl.removeEventListener("hidden.bs.offcanvas", handler);
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    } else {

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
}