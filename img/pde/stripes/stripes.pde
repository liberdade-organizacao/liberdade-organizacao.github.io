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
    fill(BLACK);
    rect(width/2, 0, width, height);
    save("stripes.png");
    exit();
}