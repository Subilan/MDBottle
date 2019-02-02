<?php

$dir = dirname(__FILE__);

class MDBottle
{
    public function GetContent($type, $components = false)
    {
        global $dir;
        switch ($type) {
            case "all":
                echo (file_get_contents($dir . "/static/head.html"));
                echo (file_get_contents($dir . "/static/components/appbar.html"));
                echo ('<body class="mdui-theme-primary-indigo mdui-theme-accent-indigo">');
                echo (file_get_contents($dir . "/static/components/banner.html"));
                echo (file_get_contents($dir . "/static/index.html"));
                echo ('</body>');
                echo (file_get_contents($dir . "/static/footer.html"));
                break;

            case "components":
                echo (file_get_contents($dir . "/static/components/" . $components . ".html"));
                break;

            default:
                echo (file_get_contents($dir . "/static/" . $type . ".html"));
        }
    }
}

$content = new MDBottle();