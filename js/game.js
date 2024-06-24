var storyButtons = document.getElementsByClassName("storyButton");
for (const storyButton of storyButtons) {
    storyButton.style.display = "none";
}
document.getElementById("storytext").style.display = "none";
document.getElementById("submitName").style.display = "block";


function submitName() {
  var name = document.getElementById("nameInput").value;
  document.getElementById("storytext").innerText =
    "Приятно познакомиться детектив " + name + ", вам предстоит распутать это странное дело! Главное сделать правильный выбор! Удачи! Первое задание: вы стоите перед хижиной, окруженной густыми деревьями. Солнце уже садится, и тени становятся длиннее. Ты видишь что дверь хижины приоткрыта, а внутри темно. Что будешь делать?";
  document.getElementById("headertext").style.display = "none";
  document.getElementById("storytext").style.display = "block";
  document.getElementById("leave").style.display = "block";
  document.getElementById("stay").style.display = "block";
}

function leave() {
  document.getElementById("storytext").innerText =
        "Обходя окрестности леса вы находите лишь старый полуразрушенный сарай, а рядом с ним одинокий колодец, которым на вид никто давно не пользовался. Вы долго не решаетесь сделать шаг, как вдруг со стороны сарая доносится шорох.";
  document.getElementById("leave").style.display = "none";
  document.getElementById("stay").style.display = "none";
  document.getElementById("run").style.display = "block";
  document.getElementById("wait").style.display = "block";
}

function stay() {
  document.getElementById("storytext").innerText =
    "Вы осторожно заходите внутрь. Внутри темно и сильно пахнет пылью, хижина выглядит абсолютно нежилой. В этой хижине стоит лишь одинокая койка и письменный стол. Он сразу приковывает ваше внимание. Вы подходите ближе и видите, что на столе лежит старая лампа, рядом с которой — несколько пожелтевших от времени бумаг.";
  document.getElementById("leave").style.display = "none";
  document.getElementById("stay").style.display = "none";
  document.getElementById("nap").style.display = "block";
  document.getElementById("explore").style.display = "block";
}

function run() {
  document.getElementById("storytext").innerText =
        "В этом сарае оказалось пусто, а шорох, который отсюда доносился, оказался лишь скрипнувшей от ветра деревяшкой. К сожалению в этом сарае вы ничего не находите и у вас не получается распутать это дело и снять заклинание с жителей. Спасибо за игру!";
  document.getElementById("run").style.display = "none";
  document.getElementById("wait").style.display = "none";
}
function wait() {
  document.getElementById("storytext").innerText =
        "Колодец оказывается пустым. На его дне вы ничего не находите. К сожалению у вас не получается раскрыть это странное дело. Спасибо за игру!";
  document.getElementById("run").style.display = "none";
  document.getElementById("wait").style.display = "none";
}

function explore() {
  document.getElementById("storytext").innerText =
    "Остальные комнаты оказались пустыми. К сожалению вы ничего не находите, у вас не получается раскрыть это запутанное дело и снять проклятие с жителей этого города. Спасибо за игру!";
  document.getElementById("nap").style.display = "none";
  document.getElementById("explore").style.display = "none"; 
}

function nap() {
  document.getElementById("storytext").innerText =
    "Вы включаете лампу и видите, что бумаги — это дневник отшельника.  В его записях упоминаются странные звуки и факты о пропаже людей. Но читая дальше, вы находите запись, в которой говорится о том, что на жителей города наложили проклятие. И чтобы его разбить, нужно воспользоваться старинным артефактом, который лежит неподалеку.";
document.getElementById("nap").style.display = "none";
  document.getElementById("explore").style.display = "none";
  document.getElementById("drink").style.display = "block";
  document.getElementById("decline").style.display = "block"; 
}

function drink() {
  document.getElementById("storytext").innerText =
    "Артефакт, который вы нашли в заброшенной хижине, представляет собой древний амулет, сделанный из неизвестного металла. Он украшен замысловатыми рунами и светится мягким голубым светом. На амулете выгравирован символ, напоминающий стилизованное солнце. В записях дневника написано заклинание для снятие проклятия. Вы начинаете читать это заклинание, амулет начинает светиться ярче, руны тоже начинают излучать свет. Когда вы произносите последние слова заклинания, амулет начинает вибрировать сильнее и внезапно вспыхивает ярким светом, ослепляя вас на мгновение. Свет постепенно затухает, и вы видите, что амулет больше не светится. Он становится холодным и безжизненным. Вы понимаете, что проклятие снято. Воздух вокруг вас становится чище, и вы чувствуете легкость и освобождение. Победа!"
     ;
  document.getElementById("drink").style.display = "none";
  document.getElementById("decline").style.display = "none"
  // Показать кнопку с ссылкой
  document.getElementById("artifactLink").style.display = "block";
  document.getElementById("use").style.display = "none";
  document.getElementById("out").style.display = "none";
  document.getElementById("run").style.display = "block";
  document.getElementById("wait").style.display = "block";;
}


function decline() {
  document.getElementById("storytext").innerText =
    "К сожалению, этот артефакт был единственным способом снять заклятие. Разрушив его, у вас не получилось раскрыть это дело и снять проклятие с жителей города. Спасибо за игру!";
  document.getElementById("drink").style.display = "none";
  document.getElementById("decline").style.display = "none";
}

function openArtifactLink() {
  window.location.href = 'https://qna.habr.com/q/937905'; 
}