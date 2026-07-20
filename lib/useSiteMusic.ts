"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionState } from "@/components/gsap/useReducedMotion";
import {
  getMusicCookie, MUSIC_SOURCES, MUSIC_VOLUME, setMusicCookie,
} from "@/lib/siteMusic";

function pickSrc(a: HTMLAudioElement) {
  return a.canPlayType('audio/webm; codecs="opus"') ? MUSIC_SOURCES[0] : MUSIC_SOURCES[1];
}

export function useSiteMusic() {
  const { reduce, ready } = useReducedMotionState();
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantedRef = useRef(false);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    audio.volume = MUSIC_VOLUME;
    audioRef.current = audio;
    return audio;
  }, []);

  const play = useCallback(async () => {
    const audio = ensureAudio();
    if (!audio.getAttribute("src")) audio.src = pickSrc(audio);
    try { await audio.play(); return true; } catch { return false; }
  }, [ensureAudio]);

  const pause = useCallback(() => { audioRef.current?.pause(); }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.preload = "none";
  }, []);

  const startWhenReady = useCallback(() => {
    const audio = ensureAudio();
    audio.src = pickSrc(audio);
    audio.preload = "auto";
    const tryPlay = () => { if (wantedRef.current) void play(); };
    audio.addEventListener("canplay", tryPlay, { once: true });
    audio.load();
    void play();
  }, [ensureAudio, play]);

  useEffect(() => {
    if (!ready) return;
    const enable = getMusicCookie() === "on" && !reduce;
    wantedRef.current = enable;
    setOn(enable);
    if (enable) startWhenReady();
    else stop();
  }, [ready, reduce, startWhenReady, stop]);

  useEffect(() => {
    if (!on) return;
    const unlock = () => { if (wantedRef.current) void play(); };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [on, play]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) pause();
      else if (wantedRef.current) void play();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [pause, play]);

  useEffect(() => () => stop(), [stop]);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      wantedRef.current = next;
      setMusicCookie(next);
      if (next) startWhenReady();
      else stop();
      return next;
    });
  }, [startWhenReady, stop]);

  return { on, toggle };
}
