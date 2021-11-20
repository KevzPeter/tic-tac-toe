import Head from "next/head";
import Game from "../components/Game";

export default function Home() {
  return (
    <div>
      <Head>
        <title>TicTacToe @Kevzpeter</title>
        <meta name="description" content="Tic Tac Toe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Game />
    </div>
  );
}
