async function loadComponent(id, filePath) {
  const element = document.getElementById(id);
  if (element) {
    const response = await fetch(filePath);
    const html = await response.text();
    element.innerHTML = html;
  }
}

// Load Components
loadComponent("nav", "/components/nav.html");
loadComponent("chat", "/components/chat.html");
loadComponent("home", "/components/home.html");
loadComponent("features", "/components/features.html");
loadComponent("demo", "/components/demo.html");
loadComponent("boost", "/components/boost.html");
loadComponent("blog", "/components/blog.html");
loadComponent("nav", "/components/footer.html")
loadComponent("nav", "/components/metrics.html")
