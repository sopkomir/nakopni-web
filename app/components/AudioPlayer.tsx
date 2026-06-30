"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  url?: string | null;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export default function AudioPlayer({ url }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const wasPlayingBeforeDragRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  const stopCardInteraction = (
    event:
      | React.SyntheticEvent<HTMLElement>
      | MouseEvent
      | PointerEvent
      | TouchEvent,
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const seekToClientX = useCallback(
    (clientX: number) => {
      const audio = audioRef.current;
      const bar = barRef.current;

      if (!audio || !bar || duration <= 0) return;

      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const nextTime = ratio * duration;

      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration],
  );

  const togglePlayback = async (event: React.MouseEvent<HTMLButtonElement>) => {
    stopCardInteraction(event);

    const audio = audioRef.current;
    if (!audio || !url) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    stopCardInteraction(event);

    const audio = audioRef.current;
    wasPlayingBeforeDragRef.current = Boolean(audio && !audio.paused);
    audio?.pause();

    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    seekToClientX(event.clientX);
  };

  useEffect(() => {
    if (!url) return;

    const audio = new Audio(url);
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [url]);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event: PointerEvent) => {
      stopCardInteraction(event);
      seekToClientX(event.clientX);
    };

    const handlePointerUp = (event: PointerEvent) => {
      stopCardInteraction(event);
      setIsDragging(false);

      if (wasPlayingBeforeDragRef.current) {
        audioRef.current?.play().then(() => setIsPlaying(true));
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, seekToClientX]);

  if (!url) return null;

  return (
    <div
      className="mt-4 space-y-2"
      onClick={stopCardInteraction}
      onMouseDown={stopCardInteraction}
      onTouchStart={stopCardInteraction}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <path d="M12 19v3" />
        </svg>
        <span>Komentár načítal autor</span>
      </div>

      <div className="flex w-full items-center gap-3 text-xs text-neutral-500">
        <button
          type="button"
          aria-label={isPlaying ? "Pozastaviť audio" : "Prehrať audio"}
          className="flex h-7 w-7 shrink-0 items-center justify-center text-neutral-900 transition hover:text-orange-500"
          onClick={togglePlayback}
        >
          <span className="block text-sm leading-none">
            {isPlaying ? "II" : ">"}
          </span>
        </button>

        <span className="w-10 shrink-0 tabular-nums">
          {formatTime(currentTime)}
        </span>

        <div
          ref={barRef}
          role="slider"
          aria-label="Pozícia audia"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
          tabIndex={0}
          className="relative h-5 min-w-0 flex-1 cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
        >
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-neutral-300" />
          <div
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-orange-500"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-orange-500"
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        <span className="w-10 shrink-0 text-right tabular-nums">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}