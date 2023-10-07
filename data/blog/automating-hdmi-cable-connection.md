---
title: "Automating HDMI cable connection and disconnection without touching the cable"
description: "How to toggle HDMI display without disconnecting the cable"
date: 2021-05-15T01:00:00+05:30
tags: ["productivity", "automation", "linux"]
draft: false
---

I usually connect an external display to my laptop. Since I do not have an inverter at my home, whenever the electricity goes off, I cannot use my external display. In that case, I cannot view the windows that are there on the external display. In order for those to be visible on the laptop's screen, I have to disconnect the HDMI cable from my laptop.

Usually there won't be much of power outages in my area. Even if it is there, it will come back with in a few minutes. In those instances, rather than disconnecting the HDMI cable, I prefer to take rest till electricity come back. If I was working on anything interesting, I would disconnect the HDMI and work in my laptop.

But, recently due to heavy rainfall, the frequency of power outages increased in my area. So, either I have to take complete rest or I have to keep on connecting and disconnecting the HDMI cable. I cannot opt for the first option because I have to pay my bills 😜. So, I started searching for ways to reduce the effort of doing the second option.

## Xrandr command line utility

I came across a tool called [xrandr](https://wiki.archlinux.org/title/Xrandr) which can be used to set the size, orientation or reflection of the outputs for a screen. I found that this tool can also be used to disable and enable the displays. That's what I wanted.

Running `xrandr` without any arguments will show the current state of all the display devices. Here's the output of `xrandr` command:

```bash
Screen 0: minimum 320 x 200, current 3926 x 1440, maximum 16384 x 16384
eDP-1 connected 1366x768+2560+472 (normal left inverted right x axis y axis) 309mm x 173mm
   1366x768      60.00*+
   1360x768      59.80    59.96
   1280x720      60.00    59.99    59.86    59.74
   1024x768      60.04    60.00
   960x720       60.00
   928x696       60.05
   896x672       60.01
   1024x576      59.95    59.96    59.90    59.82
   960x600       59.93    60.00
   960x540       59.96    59.99    59.63    59.82
   800x600       60.00    60.32    56.25
   840x525       60.01    59.88
   864x486       59.92    59.57
   800x512       60.17
   700x525       59.98
   800x450       59.95    59.82
   640x512       60.02
   720x450       59.89
   700x450       59.96    59.88
   640x480       60.00    59.94
   720x405       59.51    58.99
   684x384       59.88    59.85
   680x384       59.80    59.96
   640x400       59.88    59.98
   576x432       60.06
   640x360       59.86    59.83    59.84    59.32
   512x384       60.00
   512x288       60.00    59.92
   480x270       59.63    59.82
   400x300       60.32    56.34
   432x243       59.92    59.57
   320x240       60.05
   360x202       59.51    59.13
   320x180       59.84    59.32
HDMI-1 connected primary 2560x1440+0+0 (normal left inverted right x axis y axis) 597mm x 336mm
   2560x1440     59.95*+
   1920x1080     60.00    50.00    59.94
   1680x1050     59.88
   1600x900      60.00
   1280x1024     75.02    60.02
   1440x900      59.90
   1280x800      59.91
   1152x864      75.00
   1280x720      60.00    50.00    59.94
   1024x768      75.03    70.07    60.00
   832x624       74.55
   800x600       72.19    75.00    60.32    56.25
   720x576       50.00
   720x480       60.00    59.94
   640x480       75.00    72.81    66.67    60.00    59.94
   720x400       70.08
```

This shows that we've two output display devices named **eDP-1** (laptop's screen) and **HDMI-1** (external display). Also it shows other information such as the available resolutions and currently active resolution etc.

We can disable any output by making use of `--off` flag. For example, if I wanted to disable HDMI-1 output:

```bash
xrandr --output HDMI-1 --off
```

To enable the output, we can make use of `--auto` flag. To make one display as the primary display, we can make use of `--primary` flag. If I wanted to enable both displays and make the external display as the primary one, I can make use of the following command:

```bash
xrandr \
	--output HDMI-1 --primary --auto \
	--output eDP-1 --auto
```

Yes. You can configure multiple displays in a single command.

My use case was to toggle HDMI display. That involves checking whether the display is already disabled or not.

## Checking if the display is disabled or not

I searched a lot and couldn't find a way to do this. Then, while looking at the `xrandr` output, I found that for the enabled output, it will show the resolution along with the 'connected' information. ex:

```bash
eDP-1 connected 1366x768+0+0 (normal left inverted right x axis y axis) 309mm x 173mm
```

To check whether HDMI-1 is enabled, I can make use of `grep` to do some pattern matching.

```bash
xrandr | grep "HDMI-1 connected" | grep -Pq "\\dx\\d";
```

## Final script to toggle HDMI connection

```bash
#!/bin/sh

if xrandr | grep "HDMI-1 connected" | grep -Pq "\\dx\\d"; then
    xrandr \
        --output eDP-1 --auto --primary \
        --output HDMI-1 --off
else
    xrandr \
        --output HDMI-1 --primary --auto \
        --output eDP-1 --auto --right-of HDMI-1
fi
```

I saved this script in a location and using the keyboard shortcut manager I created a keyboard shortcut (`Mod`+`0`) to call this script.

Now, whenever the power goes or comes, instead of physically disconnecting or connecting HDMI cable, I just need to press `Mod` (windows key) + `0` 🤷‍♂️
