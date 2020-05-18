final color WHITE = #dfe5e6;
final color BLACK = #090909;
final color ORANGE = #F18F01;

void setup()
{
    size(100, 100);
}

void draw()
{
    background(WHITE);
    noStroke();
    fill(ORANGE);
    triangle(0, 0, 0, height, width, height);
    save("bg.png");
    exit();
}